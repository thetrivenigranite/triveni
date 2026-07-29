import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    id: "01",
    name: "Sarthak Gupta",
    philosophy:
      "“True luxury in stone is found in respecting its raw origin while guiding it toward timeless elegance.”",
    image:
      "https://res.cloudinary.com/x5rakscg/image/upload/v1785232043/IMG_5074_rpwfli.jpg",
  },
  {
    id: "02",
    name: "Lovish Goyal",
    philosophy:
      "“Our legacy is built on the quiet consistency of uncompromising standards and profound heritage.”",
    image:
      "https://res.cloudinary.com/x5rakscg/image/upload/v1785232098/owner1_gx9csm.jpg",
  },
  {
    id: "03",
    name: "Akshay Nirwan",
    philosophy:
      "“We do not merely source surfaces; we curate enduring narratives carved by earth over millennia.”",
    image:
      "https://res.cloudinary.com/x5rakscg/image/upload/v1785232112/owner3_lhxkbn.jpg",
  },
];

export default function TriveniVisionariesSection() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.fromTo(
        ".visionary-header-reveal",
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

      // Cards Stagger Reveal
      gsap.fromTo(
        ".visionary-card-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-brand text-primary font-body py-16 md:py-24 px-5 md:px-10 lg:px-[120px] overflow-hidden border-t border-brand"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col">
        {/* EDITORIAL HEADER BLOCK */}
        <div className="visionary-header-reveal flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 border-b border-brand pb-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-accent font-bold block">
              Leadership & Heritage
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-primary leading-[1.1]">
              The People Behind Triveni
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-body text-base md:text-lg text-secondary font-normal leading-relaxed">
              Decades of foundational vision driving our ongoing pursuit of
              natural stone integrity, authority, and timeless craftsmanship.
            </p>
          </div>
        </div>

        {/* 3 EQUAL UNIFORM CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="visionary-card-reveal flex flex-col group cursor-pointer rounded-editorial overflow-hidden bg-card border border-brand shadow-card transition-editorial hover:shadow-hover hover:-translate-y-1.5"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-soft border-b border-brand">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover transition-editorial group-hover:scale-105 duration-700"
                  loading="lazy"
                  decoding="async"
                />

                {/* Floating Glassmorphic Number Badge */}
                <div className="absolute top-4 left-4 bg-brand/90 backdrop-blur-md px-3 py-1 rounded-editorial-sm border border-brand/50">
                  <span className="font-number text-xs tracking-widest text-accent font-bold">
                    {founder.id}
                  </span>
                </div>
              </div>

              {/* CONTENT PANEL */}
              <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-primary group-hover:text-accent transition-editorial">
                    {founder.name}
                  </h3>
                </div>

                {/* Animated Accent Line */}
                <div className="w-full h-[1px] bg-brand-medium transition-editorial group-hover:bg-accent my-2" />

                <p className="font-heading italic text-base md:text-lg text-secondary leading-relaxed">
                  {founder.philosophy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
