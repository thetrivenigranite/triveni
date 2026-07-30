import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TriveniShowcaseSection() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".showcase-content-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards staggered reveal
      gsap.utils.toArray(".showcase-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-brand text-primary font-body py-16 md:py-24 px-5 md:px-10 lg:px-[120px] overflow-hidden border-t border-brand"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col">
        {/* HEADER BLOCK */}
        <div className="showcase-content-reveal flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl space-y-4">
            <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-accent font-bold block">
              Our Craft
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-primary leading-[1.1]">
              Where Exceptional Stone Meets Extraordinary Spaces
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-body text-base md:text-lg text-secondary leading-relaxed font-normal">
              From iconic architectural projects to an exclusive collection of
              natural stones, discover the craftsmanship that has defined
              Triveni for decades.
            </p>
          </div>
        </div>

        {/* DUAL EDITORIAL CARDS CONTAINER */}
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          {/* LEFT CARD: SIGNATURE PROJECTS (60%) */}
          <div className="showcase-card flex-[60%] relative min-h-[420px] md:min-h-[480px] lg:min-h-[520px] rounded-editorial overflow-hidden group cursor-pointer bg-dark shadow-card">
            <img
              src="https://res.cloudinary.com/vochf18f/image/upload/v1785388015/VISTA_LAND_dnzq3p.png"
              alt="Signature Projects"
              className="absolute inset-0 w-full h-full object-cover transition-editorial group-hover:scale-105 opacity-90"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10 text-inverse">
              <div className="flex justify-between items-start">
                <span className="font-number text-sm tracking-widest text-accent font-bold">
                  01
                </span>
                <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-white/80 font-bold">
                  Architecture
                </span>
              </div>

              <div className="space-y-6 max-w-lg">
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
                    Signature Projects
                  </h3>
                  <p className="font-body text-sm md:text-base text-gray-200 font-normal leading-relaxed">
                    Landmarks crafted with timeless natural stone.
                  </p>
                </div>

                <div>
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center bg-primary text-inverse px-7 py-3 rounded-full font-ui text-[12px] uppercase tracking-[0.15em] font-semibold transition-editorial hover:bg-[var(--color-primary-light)] shadow-soft"
                  >
                    Explore Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: STONE COLLECTION (40%) */}
          <div className="showcase-card flex-[40%] relative min-h-[420px] md:min-h-[480px] lg:min-h-[520px] rounded-editorial overflow-hidden group cursor-pointer bg-dark shadow-card">
            <img
              src="https://res.cloudinary.com/x5rakscg/image/upload/v1785234186/IMG_5066_trooyn.jpg"
              alt="Stone Collection"
              className="absolute inset-0 w-full h-full object-cover transition-editorial group-hover:scale-105 opacity-90"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10 text-inverse">
              <div className="flex justify-between items-start">
                <span className="font-number text-sm tracking-widest text-accent font-bold">
                  02
                </span>
                <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-white/80 font-bold">
                  Surfaces
                </span>
              </div>

              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
                    Stone Collection
                  </h3>
                  <p className="font-body text-sm md:text-base text-gray-200 font-normal leading-relaxed">
                    Granite, Marble, Quartzite & Luxury Surfaces.
                  </p>
                </div>

                <div>
                  <Link
                    to="/granite"
                    className="inline-flex items-center justify-center bg-primary text-inverse px-7 py-3 rounded-full font-ui text-[12px] uppercase tracking-[0.15em] font-semibold transition-editorial hover:bg-[var(--color-primary-light)] shadow-soft"
                  >
                    Browse Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
