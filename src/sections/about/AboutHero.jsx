import React, { useEffect, useState, useRef } from "react";

const designSystemStyles = `
  .smooth-scroll-container {
    --progress: 0;
    --mouse-x: 0px;
    --mouse-y: 0px;
  }

  /* --- DESKTOP ENGINE (MIN-WIDTH: 1024px) --- */
  @media (min-width: 1024px) {
    .kinetic-canvas-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      z-index: 10;
    }

    .kinetic-canvas {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      will-change: transform, border-radius;
      transform-origin: center center;
      transform: 
        translate3d(calc(var(--progress) * 23.5vw), 0, 0) 
        scaleX(calc(1 - (var(--progress) * 0.58))) 
        scaleY(calc(1 - (var(--progress) * 0.42)));
      border-radius: calc(var(--progress) * 24px);
      box-shadow: 0 24px 60px rgba(0, 0, 0, calc(var(--progress) * 0.12));
      transition: transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.15s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .kinetic-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      will-change: transform;
      transform: 
        scale(calc(1.15 - (var(--progress) * 0.15)))
        translate3d(
          calc(var(--mouse-x) * calc(1 - var(--progress))), 
          calc(var(--mouse-y) * calc(1 - var(--progress))), 
          0
        );
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  /* --- CLEAN MOBILE COMPOSITION ENGINE (MAX-WIDTH: 1023px) --- */
  @media (max-width: 1023px) {
    .kinetic-canvas-container {
      position: relative;
      width: 100%;
      height: 70vh;
      overflow: hidden;
    }
    
    .kinetic-canvas {
      width: 100%;
      height: 100%;
    }

    .kinetic-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cinematic-border-frame { inset: 16px !important; }
    .crosshair-tl { top: 24px !important; left: 24px !important; }
    .crosshair-tr { top: 24px !important; right: 24px !important; }
    .crosshair-bl { bottom: 24px !important; left: 24px !important; }
    .crosshair-br { bottom: 24px !important; right: 24px !important; }
  }

  /* --- BRANDING DECORATIONS & ANCHORS --- */
  .cinematic-border-frame {
    position: absolute;
    inset: 40px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    pointer-events: none;
    z-index: 22;
    opacity: 0;
    transform: scale(1.02);
    transition: opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1), transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cinematic-border-frame.active {
    opacity: calc(1 - (var(--progress) * 4));
    transform: scale(1);
  }

  @media (max-width: 1023px) {
    .cinematic-border-frame.active { opacity: 1; }
    .architectural-crosshair.active { opacity: 0.6; }
  }

  .architectural-crosshair {
    position: absolute;
    width: 30px;
    height: 30px;
    pointer-events: none;
    z-index: 22;
    opacity: 0;
    transition: opacity 1.2s ease-out;
  }
  .architectural-crosshair::before, .architectural-crosshair::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
  }
  .architectural-crosshair::before { top: 14px; left: 0; width: 100%; height: 1px; }
  .architectural-crosshair::after { left: 14px; top: 0; width: 1px; height: 100%; }
  
  .crosshair-tl { top: 60px; left: 60px; }
  .crosshair-tr { top: 60px; right: 60px; }
  .crosshair-bl { bottom: 120px; left: 60px; }
  .crosshair-br { bottom: 120px; right: 60px; }
  
  .architectural-crosshair.active { opacity: calc(1 - (var(--progress) * 5)); }

  .ambient-hero-title {
    position: absolute;
    z-index: 23;
    text-align: center;
    color: #FFFFFF;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    will-change: transform, opacity;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (min-width: 1024px) {
    .ambient-hero-title {
      transform: translate3d(
        calc(var(--mouse-x) * -0.4 * calc(1 - var(--progress))), 
        calc(var(--mouse-y) * -0.4 * calc(1 - var(--progress))), 
        0
      );
      opacity: calc(1 - (var(--progress) * 3));
    }
  }

  /* Content Transitions */
  .clip-reveal {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transform: translateY(30px);
    opacity: 0;
    transition: clip-path 1.2s cubic-bezier(0.22, 1, 0.36, 1), 
                transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), 
                opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .clip-reveal.active {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: translateY(0);
    opacity: 1;
  }

  .line-grow {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .line-grow.active { transform: scaleX(1); }
`;

const AboutHero = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const overlaysRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);

    const timer = setTimeout(() => {
      if (overlaysRef.current) {
        overlaysRef.current.querySelectorAll(".init-trigger").forEach((el) => el.classList.add("active"));
      }
      if (textRef.current) {
        textRef.current.querySelectorAll(".animate-trigger").forEach((el) => el.classList.add("active"));
      }
    }, 300);

    const handleScroll = () => {
      if (!sectionRef.current || window.innerWidth < 1024) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = windowHeight * 1.4; 
      const currentProgress = Math.min(Math.max(-rect.top / totalScrollableDistance, 0), 1);
      
      sectionRef.current.style.setProperty("--progress", currentProgress);
    };

    const handleMouseMove = (e) => {
      if (!sectionRef.current || window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const targetMouseX = `${((e.clientX / innerWidth) - 0.5) * 25}px`;
      const targetMouseY = `${((e.clientY / innerHeight) - 0.5) * 25}px`;
      sectionRef.current.style.setProperty("--mouse-x", targetMouseX);
      sectionRef.current.style.setProperty("--mouse-y", targetMouseY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{designSystemStyles}</style>
      
      <section 
        ref={sectionRef}
        className="smooth-scroll-container relative w-full bg-brand text-primary font-body h-auto lg:h-[240vh]"
      >
        <div className="lg:sticky lg:top-0 lg:left-0 w-full lg:h-screen lg:overflow-hidden flex flex-col justify-center px-0 lg:px-16">
          
          {/* --- HERO MEDIA CONTAINER --- */}
          <div className="kinetic-canvas-container flex items-center justify-center relative" ref={overlaysRef}>
            <div className="cinematic-border-frame init-trigger" />
            <div className="architectural-crosshair crosshair-tl init-trigger" />
            <div className="architectural-crosshair crosshair-tr init-trigger" />
            <div className="architectural-crosshair crosshair-bl init-trigger" />
            <div className="architectural-crosshair crosshair-br init-trigger" />

            <div className="ambient-hero-title px-4">
              <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-white/90 font-semibold init-trigger clip-reveal drop-shadow-md">
                The Architecture of Space
              </span>
              <h2 className="font-heading text-4xl md:text-7xl font-medium tracking-wide italic init-trigger clip-reveal drop-shadow-lg text-white">
                Triveni Studio
              </h2>
            </div>

            <div className="kinetic-canvas relative">
              <img 
                src="https://res.cloudinary.com/vochf18f/image/upload/v1785387486/IMG_5064_whlonq.jpg" 
                alt="Premium architectural marble showroom interior" 
                className="kinetic-image"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              <div 
                className="absolute inset-x-0 bottom-16 hidden lg:flex flex-col items-center justify-center text-center text-white mix-blend-normal pointer-events-none transition-opacity duration-300 z-30"
                style={{ opacity: `calc(1 - (var(--progress) * 6))` }}
              >
                <span className="font-ui text-[10px] tracking-[0.2em] uppercase font-semibold mb-2 drop-shadow-md">Scroll to Unveil</span>
                <div className="w-[1px] h-8 bg-white/60 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-white animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTENT BLOCK LAYER --- */}
          <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-20 px-6 md:px-16 lg:px-0 py-12 lg:py-0">
            
            {/* TEXT BOX */}
            <div 
              ref={textRef} 
              className="col-span-1 lg:col-span-6 space-y-4 lg:space-y-6 lg:pr-12"
              style={{ 
                opacity: isMobile ? 1 : `calc((var(--progress) - 0.25) * 4)`,
                transform: isMobile ? "none" : `translate3d(0, calc((1 - var(--progress)) * 25px), 0)`
              }}
            >
              <div className="space-y-2 lg:space-y-3">
                <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-accent font-bold block animate-trigger clip-reveal">
                  About Triveni
                </span>
                <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] font-medium text-primary animate-trigger clip-reveal">
                  Crafting Stone <br />
                  <span className="italic">Into Legacy.</span>
                </h1>
              </div>

              <div className="w-14 h-[2.5px] bg-accent animate-trigger line-grow" />

              <div className="max-w-md">
                <p className="font-body text-base md:text-lg text-secondary font-normal leading-relaxed animate-trigger clip-reveal">
                  Over thirty-five years of curation, our quarry network spans the globe, delivering raw tectonic strength into refined architectural masterpieces.
                </p>
              </div>
            </div>

            {/* NUMERICAL COUNTERS BOX */}
            <div className="col-span-1 lg:col-span-6 flex flex-col items-end w-full justify-center relative">
              <div className="w-full aspect-[4/3] hidden lg:block invisible" />
              
              <div 
                className="w-full grid grid-cols-3 gap-4 lg:gap-6 pt-6 border-t border-brand transition-all duration-300"
                style={{ 
                  opacity: isMobile ? 1 : `calc((var(--progress) - 0.75) * 4)`,
                  transform: isMobile ? "none" : `translate3d(0, calc((1 - var(--progress)) * 15px), 0)`
                }}
              >
                <div>
                  <p className="font-number text-3xl md:text-4xl font-medium text-primary">35</p>
                  <p className="font-ui text-[10px] tracking-[0.15em] uppercase font-semibold text-muted mt-1">Years Active</p>
                </div>
                <div>
                  <p className="font-number text-3xl md:text-4xl font-medium text-primary">500+</p>
                  <p className="font-ui text-[10px] tracking-[0.15em] uppercase font-semibold text-muted mt-1">Varieties</p>
                </div>
                <div>
                  <p className="font-number text-3xl md:text-4xl font-medium text-primary">40+</p>
                  <p className="font-ui text-[10px] tracking-[0.15em] uppercase font-semibold text-muted mt-1">Channels</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default AboutHero;
