import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    title: "35+ Years of Expertise",
    description:
      "Decades of knowledge in sourcing, processing, and delivering the world's finest natural stones.",
  },
  {
    number: "02",
    title: "Curated Premium Collection",
    description:
      "Handpicked marble, granite, quartzite, and exotic stones sourced from trusted global partners.",
  },
  {
    number: "03",
    title: "Precision Craftsmanship",
    description:
      "Every stone is carefully processed, inspected, and finished to the highest standards.",
  },
  {
    number: "04",
    title: "Trusted by Architects & Designers",
    description:
      "Preferred by professionals who seek uncompromising quality and timeless aesthetics.",
  },
];

export default function TriveniWhySection() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".why-content-reveal",
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

      // Image scale reveal
      gsap.fromTo(
        ".why-image-reveal",
        { scale: 0.97, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Stagger reveal for features list
      gsap.fromTo(
        ".why-feature-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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
        {/* HEADER BLOCK */}
        <div className="why-content-reveal max-w-3xl space-y-4 mb-12 md:mb-16">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-primary leading-[1.12]">
            A Legacy Built on Stone, Trust & Craftsmanship
          </h2>
          <p className="font-body text-base md:text-lg text-secondary font-normal leading-relaxed max-w-2xl">
            For over three decades, Triveni has delivered premium natural stone
            solutions combining timeless beauty, unmatched quality, and precision
            craftsmanship.
          </p>
          <div className="w-14 h-[2.5px] bg-accent mt-5" />
        </div>

        {/* TWO-COLUMN GRID LAYOUT */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* LEFT: EDITORIAL IMAGE (PERFECT FIT CONTAINER) */}
          <div className="why-image-reveal lg:col-span-6 w-full flex min-h-[380px] md:min-h-[480px]">
            <div className="relative w-full h-full rounded-[28px] overflow-hidden ">
              <img
                src="https://res.cloudinary.com/vochf18f/image/upload/v1785387960/triveni2022_aiktgs.png"
                alt="Triveni Granite Studio"
                className="w-full h-full object-cover transition-editorial hover:scale-105 duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* RIGHT: FEATURES LIST WITH DIVIDERS */}
          <div className="lg:col-span-6 w-full flex flex-col justify-between divide-y divide-[var(--border-light)]">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="why-feature-item py-6 md:py-7 first:pt-0 last:pb-0 flex flex-col group"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-number text-lg md:text-xl text-accent font-medium shrink-0">
                    {feature.number}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium text-primary group-hover:text-accent transition-editorial">
                    {feature.title}
                  </h3>
                </div>

                <p className="font-body text-sm md:text-base text-secondary font-normal leading-relaxed pl-9 mt-2 max-w-xl">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
