import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroScroledVideo from "../../assets/riteshworkkk-web1.mp4";

gsap.registerPlugin(ScrollTrigger);

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

  const [videoSrc, setVideoSrc] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // 1. Fetch video as Blob for memory caching
  useEffect(() => {
    fetch(heroScroledVideo)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
      })
      .catch((err) => console.error("Error fetching video blob:", err));

    return () => {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
  }, []);

  // 2. Optimized GSAP Sequence
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoLoaded) return;

    video.pause();
    video.currentTime = 0;

    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const updateVideoDuration = () => {
        return video.duration && !isNaN(video.duration) ? video.duration : 5;
      };

      let targetTime = 0;
      let currentTime = 0;
      let rafId = null;

      // --- 1. INITIAL MOUNT ENTRANCE (Mobile GPU-Safe) ---
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      entranceTl
        .fromTo(mediaWrapperRef.current, { scale: 1.12, opacity: 0 }, { scale: 1.06, opacity: 1, duration: 1.4 })
        .fromTo(eyebrowRef.current, 
          { opacity: 0, y: 20, filter: isMobile ? "none" : "blur(6px)" }, 
          { opacity: 1, y: 0, filter: "none", duration: 0.8 }, "-=1.0")
        .fromTo(titleRef.current, 
          { opacity: 0, y: 30, filter: isMobile ? "none" : "blur(8px)" }, 
          { opacity: 1, y: 0, filter: "none", duration: 0.9 }, "-=0.6")
        .fromTo(lineRef.current, { width: "0px", opacity: 0 }, { width: "80px", opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(subtitleRef.current, 
          { opacity: 0, y: 20, filter: isMobile ? "none" : "blur(6px)" }, 
          { opacity: 1, y: 0, filter: "none", duration: 0.8 }, "-=0.5");

      // --- 2. MASTER SCROLL-DRIVEN GSAP ANIMATION ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: isMobile ? 0.1 : 0.05, // Slightly higher scrub smooth time on mobile
          pin: pinTargetRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const dur = updateVideoDuration();
            targetTime = self.progress * dur;
          },
        },
      });

      const slideDistance = isMobile ? window.innerWidth * 1.1 : window.innerWidth * 0.8;

      tl.to(textContainerRef.current, {
        x: -slideDistance,
        ease: "power1.inOut",
      }, 0);

      tl.to(mediaWrapperRef.current, {
        scale: 1.0,
        ease: "power1.inOut",
      }, 0);

      tl.to(pinTargetRef.current, { opacity: 0.15, scale: 0.98, ease: "power1.in" }, 0.85);

      // --- 3. HARDWARE-SAFE RENDER LOOP ---
      // Mobile needs lower seeking frequency to avoid decoder locks
      const easeFactor = isMobile ? 0.2 : 0.35; 
      const threshold = isMobile ? 0.015 : 0.002;

      const renderLoop = () => {
        const diff = targetTime - currentTime;
        
        if (Math.abs(diff) > 0.0005) {
          currentTime += diff * easeFactor;
          
          const maxDur = updateVideoDuration();
          if (currentTime < 0) currentTime = 0;
          if (currentTime > maxDur) currentTime = maxDur;

          // CRITICAL MOBILE FIX: Only seek if the browser finished the previous seek!
          if (!video.seeking && Math.abs(video.currentTime - currentTime) > threshold) {
            video.currentTime = currentTime;
          }
        }

        rafId = requestAnimationFrame(renderLoop);
      };

      rafId = requestAnimationFrame(renderLoop);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isVideoLoaded]);

  return (
    <div ref={containerRef} className="w-full bg-[var(--bg-main)]">
      <div 
        ref={pinTargetRef} 
        className="w-full h-screen overflow-hidden flex items-center justify-center relative bg-[var(--bg-main)] will-change-transform"
      >
        <div 
          ref={mediaWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform opacity-0"
          style={{ transform: "scale(1.06)" }}
        >
          <video
            ref={videoRef}
            src={videoSrc || ""}
            onLoadedMetadata={() => setIsVideoLoaded(true)}
            preload="auto"
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        <div
          ref={textContainerRef}
          className="absolute z-20 pointer-events-none will-change-transform w-[85%] max-w-[550px] left-[7%] md:left-[8%] top-[28%] md:top-[24%]"
        >
          <p
            ref={eyebrowRef}
            className="font-ui text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-accent)] mb-3 md:mb-4 font-medium opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            Crafting Spaces
          </p>

          <h1
            ref={titleRef}
            className="font-heading font-light text-4xl sm:text-5xl md:text-[76px] leading-[1.1] md:leading-[1.05] tracking-[0.04em] md:tracking-[0.06em] text-white mb-4 md:mb-5 opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            Since 1989
          </h1>

          <div
            ref={lineRef}
            className="h-[1px] bg-[var(--color-accent)] mb-4 md:mb-5 opacity-0"
            style={{ width: "0px", willChange: "width, opacity" }}
          />

          <p
            ref={subtitleRef}
            className="font-heading italic text-base md:text-xl text-[var(--color-accent)] tracking-[0.08em] md:tracking-[0.1em] m-0 opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            Across India, &amp; Nepal &amp; UAE
          </p>
        </div>
      </div>
    </div>
  );
}
