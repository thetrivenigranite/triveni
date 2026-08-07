import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroScroledVideo from "../../assets/riteshworkkk-web1.mp4"; // desktop path only

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/* ------------------------------------------------------------------
 * FRAME SEQUENCE ASSETS
 * Vite-specific: eagerly imports every webp in the folder as a URL.
 * Filenames must be zero-padded (frame-0001.webp, frame-0002.webp...)
 * so the lexical sort below puts them in the right order.
 * If you're on webpack/CRA instead of Vite, tell me and I'll swap
 * this for require.context — the rest of the component is unaffected.
 * ------------------------------------------------------------------ */
const frameModules = import.meta.glob("../../assets/hero-frames/*.avif", {
  eager: true,
  as: "url",
});
const FRAME_URLS = Object.keys(frameModules)
  .sort()
  .map((key) => frameModules[key]);

/* ------------------------------------------------------------------
 * DEVICE PROFILE
 * FIX (this round): switched from "isLowEnd only" to "isMobile" for
 * choosing the image-sequence path. The lag you saw on iPhone isn't
 * a low-end-hardware problem — it's WebKit's <video> seeking model
 * itself (real per-seek decoder latency via AVFoundation, ~80-300ms,
 * that JS throttling can reduce the *frequency* of but never remove).
 * So: ALL touch/mobile viewports get the canvas sequence now; only
 * non-touch desktop-width viewports get the video-scrub path.
 * ------------------------------------------------------------------ */
function getDeviceProfile() {
  if (typeof window === "undefined") return { isMobile: false };
  const ua = navigator.userAgent || "";
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua) || (isTouch && window.innerWidth < 1024);
  return { isMobile };
}

/* ------------------------------------------------------------------
 * FRAME PRELOADER
 * Loads every frame into an in-memory Image() up front. Because these
 * are small WebP stills (not a video stream), the browser fully
 * decodes each one once and drawImage() from then on is effectively
 * free — this is what eliminates the seek latency entirely, not just
 * reduces it.
 * ------------------------------------------------------------------ */
function useFramePreloader(urls, active) {
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (!active || urls.length === 0) return;
    let cancelled = false;
    let count = 0;
    imagesRef.current = new Array(urls.length);

    urls.forEach((url, i) => {
      const img = new Image();
      img.decoding = "async";
      const onDone = () => {
        if (cancelled) return;
        imagesRef.current[i] = img;
        count += 1;
        setLoadedCount(count);
      };
      img.onload = onDone;
      img.onerror = onDone; // don't block the loader forever on one bad frame
      img.src = url;
    });

    return () => {
      cancelled = true;
    };
  }, [active, urls]);

  return { images: imagesRef, loadedCount, total: urls.length };
}

// Manual "object-fit: cover" math for canvas — canvas has no CSS
// object-fit, so we replicate it: scale to fill, center-crop overflow.
function drawCover(ctx, img, canvasW, canvasH) {
  const imgRatio = img.width / img.height;
  const canvasRatio = canvasW / canvasH;
  let drawW, drawH, offsetX, offsetY;

  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = drawH * imgRatio;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = canvasW;
    drawH = drawW / imgRatio;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  }
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

/* ------------------------------------------------------------------
 * SHARED TEXT OVERLAY — identical entrance/scroll behavior on both
 * paths, so desktop and mobile look the same aside from the media.
 * ------------------------------------------------------------------ */
function HeroText({ textContainerRef, eyebrowRef, titleRef, lineRef, subtitleRef }) {
  return (
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
      <div ref={lineRef} className="h-[1px] w-20 bg-[var(--color-accent)] mb-4 md:mb-5 opacity-0 origin-left" />
      <p
        ref={subtitleRef}
        className="font-heading italic text-base md:text-xl text-[var(--color-accent)] tracking-[0.08em] md:tracking-[0.1em] m-0 opacity-0"
      >
        Across India, &amp; Nepal &amp; UAE
      </p>
    </div>
  );
}

export default function ScrollHero() {
  const device = useMemo(getDeviceProfile, []); // computed once, before first paint

  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const mediaWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const textContainerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  const { images, loadedCount, total } = useFramePreloader(FRAME_URLS, device.isMobile);

  // ---- MOBILE: wait for every frame to be decoded before reveal ----
  useEffect(() => {
    if (!device.isMobile) return;
    if (total > 0 && loadedCount >= total) setIsReady(true);
  }, [device.isMobile, loadedCount, total]);

  // ---- DESKTOP: wait for the video to be scrub-ready (unchanged) ----
  useEffect(() => {
    if (device.isMobile) return;
    const video = videoRef.current;
    if (!video) return;
    video.preload = "auto";

    let settled = false;
    const markReady = () => {
      if (settled) return;
      settled = true;
      setIsReady(true);
    };
    video.addEventListener("canplaythrough", markReady);
    const fallbackTimer = setTimeout(() => {
      if (video.readyState >= 2) markReady();
    }, 2500);
    video.load();

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      clearTimeout(fallbackTimer);
    };
  }, [device.isMobile]);

  /* ------------------------------------------------------------------
   * GSAP / SCROLLTRIGGER — one setup, branches only on how the "media"
   * scrub target is driven (canvas frame index vs video.currentTime).
   * ------------------------------------------------------------------ */
  useEffect(() => {
    if (!isReady) return;

    const isMobile = device.isMobile;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let ctx2d = null;
    let lastDrawnFrame = -1;
    let rafId = null;

    // Size the canvas to its container in device pixels, once, and on
    // resize — never inside the scroll handler (that would be layout
    // thrashing on every scroll tick).
    const sizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR: 3x on canvas is pure waste
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx2d = canvas.getContext("2d");
      if (lastDrawnFrame >= 0 && images.current[lastDrawnFrame]) {
        drawCover(ctx2d, images.current[lastDrawnFrame], canvas.width, canvas.height);
      }
    };

    if (isMobile) {
      sizeCanvas();
      ctx2d = canvas.getContext("2d");
      // Draw the first frame immediately so there's no blank flash
      // once the loader fades.
      if (images.current[0]) drawCover(ctx2d, images.current[0], canvas.width, canvas.height);
      window.addEventListener("resize", sizeCanvas);
    } else if (video) {
      video.pause();
      video.currentTime = 0;
    }

    let ctx = gsap.context(() => {
      const entranceTargets = [mediaWrapperRef.current, eyebrowRef.current, titleRef.current, lineRef.current, subtitleRef.current];

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .set(entranceTargets, { willChange: "transform, opacity" })
        .fromTo(mediaWrapperRef.current, { scale: 1.12, opacity: 0 }, { scale: 1.06, opacity: 1, duration: 1.4 })
        .fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=1.0")
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
        .fromTo(lineRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .call(() => gsap.set(entranceTargets, { clearProps: "willChange" }));

      // Video-only smoothing state (only used on desktop).
      let targetTime = 0;
      let currentTime = 0;
      let needsWork = false;
      const getDuration = () => (video && video.duration && !isNaN(video.duration) ? video.duration : 5);

      function videoRenderLoop(now) {
        const diff = targetTime - currentTime;
        currentTime = Math.abs(diff) > 0.004 ? currentTime + diff * 0.35 : targetTime;
        const dur = getDuration();
        if (currentTime < 0) currentTime = 0;
        if (currentTime > dur) currentTime = dur;
        const bigEnough = Math.abs(video.currentTime - currentTime) > 0.01;
        if (!video.seeking && bigEnough) {
          video.currentTime = currentTime;
        }
        if (Math.abs(targetTime - currentTime) <= 0.004 && !video.seeking) needsWork = false;
        rafId = needsWork ? requestAnimationFrame(videoRenderLoop) : null;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%",
            scrub: isMobile ? 0.35 : 0.15,
            pin: pinTargetRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (isMobile) {
                /* FIX — the actual point of this whole rewrite:
                 * pick the frame index for the current (already-eased
                 * by `scrub`) progress, and draw it directly. No
                 * seeking, no decoder, no latency — a decoded bitmap
                 * blit is sub-millisecond, so this tracks the finger
                 * 1:1 even on mid-range Android and iPhone Safari. */
                const frameIndex = Math.min(total - 1, Math.round(self.progress * (total - 1)));
                if (frameIndex !== lastDrawnFrame && images.current[frameIndex]) {
                  drawCover(ctx2d, images.current[frameIndex], canvas.width, canvas.height);
                  lastDrawnFrame = frameIndex;
                }
              } else {
                targetTime = self.progress * getDuration();
                needsWork = true;
                if (!rafId) rafId = requestAnimationFrame(videoRenderLoop);
              }
            },
          },
        })
        .to(
          textContainerRef.current,
          { x: () => -(isMobile ? window.innerWidth * 1.1 : window.innerWidth * 0.8), ease: "power1.inOut" },
          0
        )
        .to(mediaWrapperRef.current, { scale: 1.0, ease: "power1.inOut" }, 0)
        .to(pinTargetRef.current, { opacity: 0.15, scale: 0.98, ease: "power1.in" }, 0.85);
    }, containerRef);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", sizeCanvas);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isReady, device.isMobile, images, total]);

  const loadProgress = device.isMobile && total > 0 ? Math.round((loadedCount / total) * 100) : null;

  return (
    <div ref={containerRef} className="w-full bg-[var(--bg-main)] relative">
      {!isReady && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[var(--bg-main)] transition-opacity duration-500">
          <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          {loadProgress !== null && (
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-accent)]">{loadProgress}%</span>
          )}
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
          {device.isMobile ? (
            <canvas ref={canvasRef} className="w-full h-full pointer-events-none select-none" />
          ) : (
            <video
              ref={videoRef}
              src={heroScroledVideo}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          )}
        </div>

        <HeroText
          textContainerRef={textContainerRef}
          eyebrowRef={eyebrowRef}
          titleRef={titleRef}
          lineRef={lineRef}
          subtitleRef={subtitleRef}
        />
      </div>
    </div>
  );
}