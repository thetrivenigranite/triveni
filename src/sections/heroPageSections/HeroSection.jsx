import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroScroledVideo from "../../assets/riteshworkkk-web1.mp4";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
 * GLOBAL SCROLLTRIGGER CONFIG (runs once, module load time)
 *
 * FIX: ignoreMobileResize
 * iOS Safari fires a `resize` event every time the address bar
 * shows/hides while scrolling. Without this flag, ScrollTrigger
 * re-measures the page (and can re-pin) on almost every scroll tick
 * on iPhone — this is one of the single biggest causes of mobile
 * pinned-scroll jank, independent of anything else in this file.
 * ------------------------------------------------------------------ */
ScrollTrigger.config({
  ignoreMobileResize: true,
});

/* ------------------------------------------------------------------
 * DEVICE PROFILE — computed once per mount, never per frame.
 * We classify by capability, not just viewport width, so a low-end
 * Android in landscape still gets the cheap path, and hardware
 * signals (cores/memory/network) let us drop to an even lighter
 * render tier automatically.
 * ------------------------------------------------------------------ */
function getDeviceProfile() {
  if (typeof window === "undefined") return { isMobile: false, isLowEnd: false };

  const ua = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;

  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4; // Chrome/Android only; undefined on Safari
  const conn = navigator.connection || {};
  const saveData = !!conn.saveData;
  const slowNetwork = ["slow-2g", "2g", "3g"].includes(conn.effectiveType);

  const isLowEnd = isMobile && (cores <= 4 || mem <= 4 || saveData || slowNetwork);

  return { isMobile, isLowEnd };
}

export default function DesktopCanvas() {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const videoRef = useRef(null);
  const mediaWrapperRef = useRef(null);

  const textContainerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  // GSAP/ScrollTrigger must not touch the DOM until the video can
  // actually be scrubbed without stalling — this state gates that.
  const [isReady, setIsReady] = useState(false);
  const deviceRef = useRef({ isMobile: false, isLowEnd: false });

  /* ------------------------------------------------------------------
   * VIDEO READINESS
   *
   * FIX: no more Blob fetch. We assign the imported URL straight to
   * `src` so the browser handles byte-range streaming/caching itself
   * (it's better at this than a manual fetch, and doesn't hold the
   * whole file in memory).
   *
   * FIX: we gate on `canplaythrough` (browser believes it can play to
   * the end without stalling at the current download rate) instead of
   * `loadedmetadata`. Metadata alone doesn't mean enough frames are
   * buffered to scrub — seeking into unbuffered video is what stalls
   * the decoder on mobile. A short fallback timer covers browsers that
   * are conservative about firing canplaythrough for muted/inline video.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    deviceRef.current = getDeviceProfile();
    const video = videoRef.current;
    if (!video) return;

    // Low-end / save-data devices: don't force aggressive preloading.
    // "metadata" still gives us duration/dimensions fast; the browser
    // buffers the rest opportunistically as the user scrolls.
    video.preload = deviceRef.current.isLowEnd ? "metadata" : "auto";

    let settled = false;
    const markReady = () => {
      if (settled) return;
      settled = true;
      setIsReady(true);
    };

    video.addEventListener("canplaythrough", markReady);
    const fallbackTimer = setTimeout(() => {
      if (video.readyState >= 2) markReady(); // HAVE_CURRENT_DATA or better
    }, 2500);

    video.load();

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      clearTimeout(fallbackTimer);
    };
  }, []);

  /* ------------------------------------------------------------------
   * GSAP / SCROLLTRIGGER — only runs once the video is actually ready.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    video.pause();
    video.currentTime = 0;

    const { isMobile, isLowEnd } = deviceRef.current;

    // Mutable scrub state lives in the outer effect scope (not React
    // state) so updates never trigger a re-render, and so the cleanup
    // function below can reach `rafId` to cancel any pending frame.
    let targetTime = 0;
    let currentTime = 0;
    let needsWork = false;
    let rafId = null;
    let lastSeekAt = 0;

    const getDuration = () =>
      video.duration && !isNaN(video.duration) ? video.duration : 5;

    // ---- render-loop tuning, per device tier --------------------
    // Minimum ms between actual `currentTime` writes. Desktop can take
    // near-every-frame seeks; mobile decoders cannot service seeks at
    // 60Hz, so we hard-cap how often we even try, on top of the
    // existing `!video.seeking` guard.
    const seekIntervalMs = isLowEnd ? 66 : isMobile ? 40 : 0; // ~15fps / ~25fps / uncapped
    const easeFactor = isMobile ? 0.22 : 0.35;
    const settleThreshold = isMobile ? 0.02 : 0.004; // "close enough, stop looping"
    const seekThreshold = isMobile ? 0.05 : 0.01; // "far enough to bother seeking"

    /* FIX: the original loop scheduled requestAnimationFrame forever,
     * even at rest, continuously computing near-zero deltas — pure
     * wasted CPU/battery on mobile. This version stops scheduling once
     * the video has caught up (`needsWork = false`) and only wakes back
     * up when ScrollTrigger's onUpdate fires with new scroll input. */
    function renderLoop(now) {
      const diff = targetTime - currentTime;
      currentTime =
        Math.abs(diff) > settleThreshold ? currentTime + diff * easeFactor : targetTime;

      const dur = getDuration();
      if (currentTime < 0) currentTime = 0;
      if (currentTime > dur) currentTime = dur;

      const timeSinceLastSeek = now - lastSeekAt;
      const bigEnoughJump = Math.abs(video.currentTime - currentTime) > seekThreshold;

      // Three guards combined — this is the core mobile fix:
      //  1. !video.seeking      -> never overlap seeks
      //  2. bigEnoughJump       -> skip visually-insignificant deltas
      //  3. timeSinceLastSeek   -> hard per-device cap on seek rate
      if (!video.seeking && bigEnoughJump && timeSinceLastSeek >= seekIntervalMs) {
        video.currentTime = currentTime;
        lastSeekAt = now;
      }

      if (Math.abs(targetTime - currentTime) <= settleThreshold && !video.seeking) {
        needsWork = false;
      }

      rafId = needsWork ? requestAnimationFrame(renderLoop) : null;
    }

    let ctx = gsap.context(() => {
      const skipBlur = isMobile || isLowEnd;

      const entranceTargets = [
        mediaWrapperRef.current,
        eyebrowRef.current,
        titleRef.current,
        lineRef.current,
        subtitleRef.current,
      ];

      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entranceTl
        // FIX: will-change applied only for the duration of the
        // entrance animation, then cleared (see .call below) — not
        // left on indefinitely, which keeps GPU compositor layers
        // alive for the rest of the page's life for no reason.
        .set(entranceTargets, { willChange: "transform, opacity" })
        .fromTo(
          mediaWrapperRef.current,
          { scale: 1.12, opacity: 0 },
          { scale: 1.06, opacity: 1, duration: 1.4 }
        )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 20, filter: skipBlur ? "none" : "blur(6px)" },
          { opacity: 1, y: 0, filter: "none", duration: 0.8 },
          "-=1.0"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30, filter: skipBlur ? "none" : "blur(8px)" },
          { opacity: 1, y: 0, filter: "none", duration: 0.9 },
          "-=0.6"
        )
        // FIX: `width` -> `scaleX`. Width is a layout property (forces
        // reflow every tick); scaleX is compositor-only. origin-left
        // keeps the same "grows rightward" look as the width version.
        .fromTo(lineRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20, filter: skipBlur ? "none" : "blur(6px)" },
          { opacity: 1, y: 0, filter: "none", duration: 0.8 },
          "-=0.5"
        )
        .call(() => gsap.set(entranceTargets, { clearProps: "willChange" }));

      // ---- master scroll-driven timeline --------------------------
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          // FIX: a very low scrub (0.05–0.1) makes onUpdate fire on
          // almost every micro scroll delta, each one attempting a
          // seek. A slightly larger value coalesces rapid deltas into
          // fewer, larger seeks — mobile decoders are the bottleneck,
          // not GSAP's math, so this is what actually buys back fps.
          scrub: isMobile ? 0.35 : 0.15,
          pin: pinTargetRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            targetTime = self.progress * getDuration();
            needsWork = true;
            if (!rafId) rafId = requestAnimationFrame(renderLoop);
          },
        },
      })
        .to(
          textContainerRef.current,
          {
            // Function-based value: GSAP re-evaluates this on every
            // ScrollTrigger refresh/resize automatically, instead of
            // us manually recomputing and re-binding a fresh tween.
            x: () => -(isMobile ? window.innerWidth * 1.1 : window.innerWidth * 0.8),
            ease: "power1.inOut",
          },
          0
        )
        .to(mediaWrapperRef.current, { scale: 1.0, ease: "power1.inOut" }, 0)
        .to(pinTargetRef.current, { opacity: 0.15, scale: 0.98, ease: "power1.in" }, 0.85);
    }, containerRef);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isReady]);

  return (
    <div ref={containerRef} className="w-full bg-[var(--bg-main)] relative">
      {/* Loader: GSAP/ScrollTrigger never initialize before the video
          is actually scrub-ready (see the isReady effect above). */}
      {!isReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-main)] transition-opacity duration-500">
          <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div
        ref={pinTargetRef}
        className="w-full h-screen overflow-hidden flex items-center justify-center relative bg-[var(--bg-main)]"
      >
        <div
          ref={mediaWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden opacity-0"
          style={{ transform: "translate3d(0,0,0) scale(1.06)" }}
        >
          <video
            ref={videoRef}
            src={heroScroledVideo}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        <div
          ref={textContainerRef}
          className="absolute z-20 pointer-events-none w-[85%] max-w-[550px] left-[7%] md:left-[8%] top-[28%] md:top-[24%]"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          <p
            ref={eyebrowRef}
            className="font-ui text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-accent)] mb-3 md:mb-4 font-medium opacity-0"
          >
            Crafting Spaces
          </p>

          <h1
            ref={titleRef}
            className="font-heading font-light text-4xl sm:text-5xl md:text-[76px] leading-[1.1] md:leading-[1.05] tracking-[0.04em] md:tracking-[0.06em] text-white mb-4 md:mb-5 opacity-0"
          >
            Since 1989
          </h1>

          <div
            ref={lineRef}
            className="h-[1px] w-20 bg-[var(--color-accent)] mb-4 md:mb-5 opacity-0 origin-left"
          />

          <p
            ref={subtitleRef}
            className="font-heading italic text-base md:text-xl text-[var(--color-accent)] tracking-[0.08em] md:tracking-[0.1em] m-0 opacity-0"
          >
            Across India, &amp; Nepal &amp; UAE
          </p>
        </div>
      </div>
    </div>
  );
}