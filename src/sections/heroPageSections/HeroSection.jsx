import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Note: Make sure to point this to the "optimized-hero.mp4" you generated with FFmpeg
import heroScroledVideo from "../../assets/riteshworkkk-web1.mp4"; 

gsap.registerPlugin(ScrollTrigger);

export default function DesktopCanvas() {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const videoRef = useRef(null);
  const mediaWrapperRef = useRef(null);

  // Typography container reference for cleanup/animation
  const textContainerRef = useRef(null);

  // Typography references for entrance and scrubbed sequences
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  // --- STATE FOR OPTIMIZED VIDEO LOADING ---
  const [videoSrc, setVideoSrc] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // 1. Fetch the video as a Blob to store it in memory for lag-free scrubbing
  useEffect(() => {
    fetch(heroScroledVideo)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
      })
      .catch((err) => console.error("Error fetching video blob:", err));

    return () => {
      // Cleanup the blob URL to prevent memory leaks
      if (videoSrc) URL.revokeObjectURL(videoSrc);
    };
  }, []);

  // 2. Initialize GSAP only AFTER the video is loaded in memory
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoLoaded) return;

    video.pause();
    video.currentTime = 0;

    let ctx = gsap.context(() => {
      const updateVideoDuration = () => {
        return video.duration && !isNaN(video.duration) ? video.duration : 5;
      };

      let targetTime = 0;
      let currentTime = 0;
      let rafId = null;

      // --- INITIAL MOUNT ENTRANCE ANIMATION ---
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      entranceTl
        .fromTo(mediaWrapperRef.current, { scale: 1.12, opacity: 0 }, { scale: 1.06, opacity: 1, duration: 1.4 })
        .fromTo(eyebrowRef.current, { opacity: 0, y: 20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=1.0")
        .fromTo(titleRef.current, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, "-=0.6")
        .fromTo(lineRef.current, { width: "0px", opacity: 0 }, { width: "80px", opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(subtitleRef.current, { opacity: 0, y: 20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.5");

      // --- MASTER SCROLL-DRIVEN GSAP ANIMATION ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 0.05,
          pin: pinTargetRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const dur = updateVideoDuration();
            targetTime = self.progress * dur;
          },
        },
      });

      // Responsive slide distance: full window width on mobile, percentage on desktop
      const isMobile = window.innerWidth < 768;
      const slideDistance = isMobile ? window.innerWidth * 1.1 : window.innerWidth * 0.8;

      // Slide text horizontally to the left out of the screen dynamically on scroll
      tl.to(textContainerRef.current, {
        x: -slideDistance,
        ease: "power1.inOut",
      }, 0);

      // Subtle zoom effect during scroll
      tl.to(mediaWrapperRef.current, {
        scale: 1.0,
        ease: "power1.inOut",
      }, 0);

      // Scroll-linked secondary adjustments & exit transition
      tl.to(pinTargetRef.current, { opacity: 0.15, scale: 0.98, ease: "power1.in" }, 0.85);

      // High-frequency render loop for zero-lag video frame mapping
      const renderLoop = () => {
        const diff = targetTime - currentTime;
        
        if (Math.abs(diff) > 0.0005) {
          currentTime += diff * 0.35;
          
          const maxDur = updateVideoDuration();
          if (currentTime < 0) currentTime = 0;
          if (currentTime > maxDur) currentTime = maxDur;

          if (Math.abs(video.currentTime - currentTime) > 0.002) {
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
  }, [isVideoLoaded]); // Dependency array now waits for isVideoLoaded to be true

  return (
    <div ref={containerRef} className="w-full bg-[var(--bg-main)]">
      
      {/* Pinned Viewport Container */}
      <div 
        ref={pinTargetRef} 
        className="w-full h-screen overflow-hidden flex items-center justify-center relative bg-[var(--bg-main)] will-change-transform"
      >
        
        {/* --- DYNAMIC MEDIA CONTAINER --- */}
        <div 
          ref={mediaWrapperRef}
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform opacity-0"
          style={{ transform: "scale(1.06)" }}
        >
          <video
            ref={videoRef}
            src={videoSrc || ""} // Use the loaded Blob URL here
            onLoadedMetadata={() => setIsVideoLoaded(true)} // Tell GSAP it's ready
            preload="auto"
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* --- HIGH-END TYPOGRAPHY OVERLAY LAYER --- */}
        <div
          ref={textContainerRef}
          className="absolute z-20 pointer-events-none will-change-transform w-[85%] max-w-[550px] left-[7%] md:left-[8%] top-[28%] md:top-[24%]"
        >
          <p
            ref={eyebrowRef}
            className="font-ui text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-[var(--color-accent)] mb-3 md:mb-4 font-medium opacity-0"
            style={{ willChange: "transform, opacity, filter, letter-spacing" }}
          >
            Crafting Spaces
          </p>

          <h1
            ref={titleRef}
            className="font-heading font-light text-4xl sm:text-5xl md:text-[76px] leading-[1.1] md:leading-[1.05] tracking-[0.04em] md:tracking-[0.06em] text-white mb-4 md:mb-5 opacity-0"
            style={{ willChange: "transform, opacity, filter" }}
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
            style={{ willChange: "transform, opacity, filter" }}
          >
            Across India, &amp; Nepal &amp; UAE
          </p>
        </div>

      </div>
    </div>
  );
}
