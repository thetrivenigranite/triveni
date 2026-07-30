import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  "Delhi",
  "Abu Road",
  "Dubai",
  "+91 9953226549",
  "info@trivenigranite.com",
];

export default function TriveniCtaSection() {
  const containerRef = useRef(null);
const nav = useNavigate()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content-reveal",
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#F8F6F2] text-[#1D1D1B] font-sans selection:bg-[#A08B6A] selection:text-[#F8F6F2] py-12 md:py-16 px-6 md:px-12 overflow-hidden border-t border-[#E6E1D8]"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
        
        {/* EDITORIAL CONTENT BLOCK */}
        <div className="cta-content-reveal max-w-3xl space-y-4 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#A08B6A] font-medium block">
            Begin Your Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.03em] font-display text-[#1D1D1B] leading-[1.1]">
            Let's Create Something Timeless.
          </h2>
          <p className="text-sm md:text-base text-[#6E6B67] leading-[1.7] font-light max-w-[580px]">
            Whether designing a private residence or an iconic architectural project, our experts are ready to help you select natural stone that stands the test of time.
          </p>
        </div>

        {/* PREMIUM CTA BUTTON */}
        <div className="cta-content-reveal mt-8 mb-10">
          <button onClick={()=>nav("/contact")} className="inline-flex items-center justify-center bg-[#1D1D1B] text-white px-8 py-3.5 rounded-full font-sans text-[11px] uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:bg-[#2C2C29]">
            Schedule a Consultation
          </button>
        </div>

        {/* ELEGANT CONTACT STRIP AT THE BOTTOM */}
        <div className="cta-content-reveal w-full max-w-4xl pt-6 border-t border-[#E6E1D8] flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {contactItems.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <div className="hidden md:block w-1 h-1 rounded-full bg-[#A08B6A]/50" />
              )}
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#7A746C] font-sans font-medium transition-colors duration-300 hover:text-[#1D1D1B]">
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}