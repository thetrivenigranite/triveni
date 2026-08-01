import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { chapterLayouts, GiantYear } from "./ChapterLayouts";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    id: "01",
    year: "1989",
    location: "DELHI",
    title: "The foundation was laid.",
    description:
      "A vision to bring exceptional stone craftsmanship to India began in Delhi.",
    bgImage: "https://res.cloudinary.com/vochf18f/image/upload/v1785387816/delhi1989_dad3ap.png",
  },
  {
    id: "02",
    year: "1992",
    location: "KATHMANDU, NEPAL",
    title: "Crossing borders.",
    description:
      "Triveni expanded its reach beyond India, establishing a presence in Nepal.",
    bgImage: "https://res.cloudinary.com/vochf18f/image/upload/v1785387820/nepal_vzhqtq.png",
  },
  {
    id: "03",
    year: "1994",
    location: "ABU ROAD, RAJASTHAN",
    title: "Closer to the source.",
    description:
      "Abu Road became a strategic hub, connecting craftsmanship with natural resources.",
    bgImage:
      "https://res.cloudinary.com/vochf18f/image/upload/v1785387854/image2_suhgjl.png",
  },
  {
    id: "04",
    year: "2005",
    location: "NEW OUTLET, DELHI",
    title: "Expanding the experience.",
    description:
      "A new destination where architects, designers, and homeowners discovered premium stone collections.",
    bgImage: "https://res.cloudinary.com/vochf18f/image/upload/v1785387945/Delhi_2005_re6av3.png",
  },
  {
    id: "05",
    year: "2017",
    location: "FACTORY ESTABLISHMENT, ABU ROAD",
    title: "Scaling excellence.",
    description:
      "A state-of-the-art manufacturing facility strengthened our commitment to quality and innovation.",
    bgImage:
      "https://res.cloudinary.com/vochf18f/image/upload/v1785387967/image1_jtlz2d.png",
  },
  {
    id: "06",
    year: "2022",
    location: "MOHALI",
    title: "Bringing luxury closer.",
    description:
      "Expanding into Punjab with a new destination for timeless surfaces and contemporary design.",
    bgImage: "https://res.cloudinary.com/vochf18f/image/upload/v1785387960/triveni2022_aiktgs.png",
  },
  {
    id: "07",
    year: "2025",
    location: "DUBAI",
    title: "Global horizons.",
    description:
      "Triveni enters Dubai, marking a new chapter in its international journey.",
    bgImage:
      "https://res.cloudinary.com/vochf18f/image/upload/v1785559885/trivenidubai_iiqfw0.png",
  },
];

/* Milestone years shown on the hero's thin horizontal timeline. */
const timelineYears = chapters.map((c) => c.year);

function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center px-6 md:px-14 pt-28 pb-16 overflow-hidden">
      {/* faint architectural grid — signature motif, reused sparingly */}
      <div
        aria-hidden="true"
        className="hero-grid absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-light) 1px, transparent 1px), linear-gradient(90deg, var(--border-light) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto w-full grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* Left — editorial headline */}
        <div className="md:col-span-6 hero-text">
          <span className="font-ui text-[11px] md:text-xs tracking-[0.16em] uppercase text-accent block mb-6">
            Triveni Legacy — Est. 1989
          </span>
          <h1 className="font-heading text-[13vw] md:text-[4.6vw] leading-[1.02] text-primary">
            Triveni Legacy
            <br />
            <span className="italic text-accent">Crafted Across</span>
            <br />
            Generations.
          </h1>
          <p className="font-body text-sm md:text-base text-secondary max-w-md leading-relaxed mt-8">
            A chronological exploration of architecture, craftsmanship and
            global expansion — thirty-six years of shaping stone into legacy,
            told one chapter at a time.
          </p>

          {/* Thin horizontal timeline, beginning at 1989 */}
          <div className="hero-timeline mt-14 md:mt-20 relative">
            <div className="h-px w-full bg-[var(--border-light)] relative">
              <div className="hero-timeline-fill absolute left-0 top-0 h-px bg-accent w-0" />
            </div>
            <div className="flex justify-between mt-3">
              {timelineYears.map((y) => (
                <span
                  key={y}
                  className="font-number text-[10px] md:text-xs text-secondary"
                >
                  {y}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — large architectural image */}
        <div className="md:col-span-6 relative">
          <div className="hero-image-wrap relative w-full h-[46vh] md:h-[70vh] rounded-editorial overflow-hidden shadow-card">
            <img
              src="https://res.cloudinary.com/vochf18f/image/upload/v1785387486/IMG_5064_whlonq.jpg"
              alt="Triveni architectural stonework"
              className="hero-image absolute inset-0 w-full h-[130%] object-cover will-change-transform"
              loading="eager"
              decoding="async"
            />
          </div>
          <GiantYear
            year="1989"
            tone="faded"
            className="absolute -bottom-8 -left-6 md:-left-10 text-[18vw] md:text-[6vw] -z-10"
          />
        </div>
      </div>
    </section>
  );
}

export default function TriveniLegacyScrollytelling() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef(null);

  useLayoutEffect(() => {
    const sectionElement = containerRef.current;
    if (!sectionElement) return;

    let lenis = null;
    let ctx = null;

    // Trigger-based entry loader using ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: sectionElement,
      start: "top 80%", // Triggers when the top of the component hits 80% down the viewport
      once: true,
      onEnter: () => {
        // Run section-specific entrance loader animation
        const tl = gsap.timeline({
          onComplete: () => setIsLoading(false),
        });

        tl.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        });

        // 1. Smooth cinematic scrolling inside the component
        lenis = new Lenis({
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        lenis.on("scroll", ScrollTrigger.update);
        const lenisRaf = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisRaf);
        gsap.ticker.lagSmoothing(0);

        // 2. GSAP animation setup
        ctx = gsap.context(() => {
          /* ---------- Hero ---------- */
          const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
          heroTl
            .fromTo(
              ".hero-image-wrap",
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.4,
                ease: "power4.inOut",
              },
            )
            .fromTo(
              ".hero-image",
              { scale: 1.25 },
              { scale: 1, duration: 1.8, ease: "power3.out" },
              0,
            )
            .fromTo(
              ".hero-text > *",
              { y: 32, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
              0.25,
            );

          gsap.to(".hero-timeline-fill", {
            width: "100%",
            duration: 1.6,
            ease: "power2.inOut",
            delay: 0.9,
          });

          gsap.to(".hero-image", {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-image-wrap",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          /* ---------- Chapter images: clip-path reveal + parallax ---------- */
          gsap.utils.toArray(".chapter-image-wrap").forEach((wrapper) => {
            const img = wrapper.querySelector(".chapter-image");

            gsap.fromTo(
              wrapper,
              { clipPath: "inset(18% 0% 18% 0% round 0px)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top 85%",
                },
              },
            );

            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.18 },
                {
                  scale: 1,
                  duration: 1.4,
                  ease: "power3.out",
                  scrollTrigger: { trigger: wrapper, start: "top 85%" },
                },
              );
              gsap.to(img, {
                yPercent: 14,
                ease: "none",
                scrollTrigger: {
                  trigger: wrapper,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            }
          });

          /* ---------- Floating editorial cards ---------- */
          gsap.utils.toArray(".chapter-card").forEach((card) => {
            gsap.fromTo(
              card,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 92%" },
              },
            );
          });

          /* ---------- Giant background years: slow parallax + fade ---------- */
          gsap.utils.toArray(".chapter-year-giant").forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, yPercent: 10 },
              {
                opacity: 1,
                yPercent: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 95%" },
              },
            );
            gsap.to(el, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });

          /* ---------- Titles: gentle reveal ---------- */
          gsap.utils.toArray(".chapter-card .chapter-title").forEach((el) => {
            gsap.fromTo(
              el,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%" },
              },
            );
          });

          /* ---------- Finale: animated journey map ---------- */
          const mapPath = document.querySelector(".map-path");
          if (mapPath) {
            const length = mapPath.getTotalLength();
            gsap.set(mapPath, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });

            gsap.to(mapPath, {
              strokeDashoffset: 0,
              duration: 2,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: ".finale-section",
                start: "top center",
                end: "bottom bottom",
                scrub: 1.5,
              },
            });
          }

          gsap.fromTo(
            ".map-node",
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.3,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: ".finale-section",
                start: "top 40%",
                end: "bottom 80%",
                scrub: 1,
              },
            },
          );

          gsap.utils.toArray(".stat-card").forEach((card, i) => {
            gsap.fromTo(
              card,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 92%" },
              },
            );
          });
        }, containerRef);
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      st.kill();
      window.removeEventListener("load", refresh);
      if (lenis) {
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
        lenis.destroy();
      }
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-brand text-primary font-body overflow-x-hidden relative"
    >
      {/* Section Entry Curtain Loader */}
      <div
        ref={loaderRef}
        className={`absolute inset-0 z-50 bg-brand flex flex-col items-center justify-center transition-opacity duration-300 ${
          !isLoading ? "pointer-events-none" : ""
        }`}
      >
        <div className="space-y-4 text-center">
          <span className="font-ui text-xs tracking-[0.2em] uppercase text-accent animate-pulse">
            Loading Experience
          </span>
          <div className="w-32 h-[2px] bg-secondary/20 relative overflow-hidden mx-auto">
            <div className="absolute inset-0 bg-accent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>

      <Hero />

      {/* MAIN TIMELINE — seven unique editorial layouts, one per chapter */}
      <main className="relative z-20 pb-24 pt-8 space-y-28 md:space-y-44">
        {chapters.map((chapter, index) => {
          const Layout = chapterLayouts[index] ?? chapterLayouts[0];
          return (
            <section key={chapter.id} className="relative w-full px-4 md:px-10">
              <Layout chapter={chapter} id={chapter.id} />
            </section>
          );
        })}
      </main>

      {/* FINALE — the animated journey map */}
      <section className="finale-section relative w-full bg-soft pt-28 pb-24 rounded-editorial-lg overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="text-center mb-16 space-y-3">
            <h4 className="font-ui text-[11px] tracking-[0.16em] uppercase text-accent">
              The Constellation of Craft
            </h4>
            <h2 className="font-heading text-4xl md:text-6xl text-primary">
              An Expanding <span className="italic text-accent">Legacy</span>
            </h2>
          </div>

          {/* Journey map */}
          <div className="w-full max-w-4xl relative h-[280px] md:h-[360px] mb-20">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                className="map-path"
                d="M50,200 Q150,50 250,150 T450,250 T650,150 T850,200 T950,100"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              <g className="map-node">
                <circle cx="50" cy="200" r="5" fill="var(--color-primary)" />
                <text
                  x="50"
                  y="230"
                  fill="var(--text-secondary)"
                  fontSize="11"
                  textAnchor="middle"
                  letterSpacing="0.15em"
                >
                  DELHI
                </text>
              </g>
              <g className="map-node">
                <circle cx="250" cy="150" r="5" fill="var(--color-primary)" />
                <text
                  x="250"
                  y="180"
                  fill="var(--text-secondary)"
                  fontSize="11"
                  textAnchor="middle"
                  letterSpacing="0.15em"
                >
                  KATHMANDU
                </text>
              </g>
              <g className="map-node">
                <circle cx="450" cy="250" r="5" fill="var(--color-primary)" />
                <text
                  x="450"
                  y="280"
                  fill="var(--text-secondary)"
                  fontSize="11"
                  textAnchor="middle"
                  letterSpacing="0.15em"
                >
                  ABU ROAD
                </text>
              </g>
              <g className="map-node">
                <circle cx="650" cy="150" r="5" fill="var(--color-primary)" />
                <text
                  x="650"
                  y="180"
                  fill="var(--text-secondary)"
                  fontSize="11"
                  textAnchor="middle"
                  letterSpacing="0.15em"
                >
                  MOHALI
                </text>
              </g>
              <g className="map-node">
                <circle cx="950" cy="100" r="8" fill="var(--color-accent)" />
                <circle
                  cx="950"
                  cy="100"
                  r="16"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1"
                  className="animate-ping"
                />
                <text
                  x="950"
                  y="138"
                  fill="var(--color-accent)"
                  fontSize="13"
                  fontWeight="600"
                  textAnchor="middle"
                  letterSpacing="0.2em"
                >
                  DUBAI
                </text>
              </g>
            </svg>
          </div>

          {/* Statistics */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-4">
            {[
              { value: "1989", label: "Founded" },
              { value: "7", label: "Global Hubs" },
              { value: "36", label: "Years of Caliber" },
              { value: "1000+", label: "Masterpieces" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat-card bg-card rounded-editorial-sm shadow-soft p-6 text-center transition-editorial hover:shadow-hover"
              >
                <p className="font-number text-3xl md:text-4xl text-accent mb-1">
                  {stat.value}
                </p>
                <p className="font-ui text-[10px] tracking-[0.16em] uppercase text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
