import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Phone, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

const ProductsPage = ({
  title = "Statuario Extra",
  subtitle = "Natural Stone Collection",
  heroDescription = "Curated directly from Italian quarries, featuring distinct fluid veining and high structural density for high-end residential and commercial architecture.",
  heroImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
  aboutTitle = "Timeless Geological Elegance",
  aboutText = "Formed through intense pressure and deep earth heat, each slab possesses a distinct character. Our material curators select lot bundles based on vein harmony, surface density, and mechanical performance.",
  aboutImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
  applications = [],
  gallery = [],
  features = [],
  finishes = [],
  whyChoose = [],
}) => {
  const [activeFinish, setActiveFinish] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="bg-brand text-primary font-body antialiased min-h-screen selection:bg-accent selection:text-white">
      
      {/* 1. HERO SECTION */}
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-slate-100 flex flex-col justify-between pt-24 pb-10 border-b border-slate-200">
  {/* 1. Full Brightness Background Image (No Dark Overlay) */}
  <div className="absolute inset-0 z-0">
    <img
      src={heroImage}
      alt={title}
      className="h-full w-full object-cover object-center opacity-100 scale-100 transition-transform duration-[7s] ease-out"
    />
  </div>

  {/* 2. Light Top Accent Badges */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex justify-between items-center">
    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/80 rounded-full shadow-sm">
      <Sparkles size={14} className="text-amber-500" />
      <span className="font-ui text-xs font-bold uppercase tracking-wider text-slate-900">
        {subtitle}
      </span>
    </div>

    <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/80 rounded-full shadow-sm">
      <span className="font-ui text-xs font-bold uppercase tracking-widest text-slate-800">
        Triveni Studio Collection
      </span>
    </div>
  </div>

  {/* 3. Pure White Frosted Glass Content Card */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full my-auto py-8">
    <div className="max-w-2xl bg-white/85 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/90 shadow-2xl space-y-6">
      
      {/* Title */}
      <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-slate-900 font-medium tracking-tight leading-[1.02]">
        {title}
      </h1>

      {/* Description */}
      <p className="font-body text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
        {heroDescription}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200/80">
        <a
          href="#gallery"
          className="bg-[#13205D] hover:bg-[#0f194a] !text-white font-ui text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-all shadow-md inline-flex items-center gap-2"
        >
          Explore Slabs <ArrowUpRight size={14} strokeWidth={2.5} />
        </a>
        <a
          href="#inquiry"
          className="bg-white/90 hover:bg-white border border-slate-300 text-slate-800 font-ui text-xs uppercase tracking-widest font-bold px-7 py-4 rounded-full transition-all shadow-sm inline-flex items-center gap-2"
        >
          Request Batch Spec
        </a>
      </div>

    </div>
  </div>

  {/* 4. Light Bottom Certification Bar */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
    <div className="bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl py-3.5 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-ui text-slate-800 shadow-sm">
      <div className="flex items-center gap-2.5">
        <ShieldCheck size={16} className="text-amber-600 shrink-0" />
        <span className="font-semibold text-slate-900">Verified Quarry Extraction & Lot Identification</span>
      </div>
      <span className="hidden md:inline text-slate-600 font-semibold tracking-wider uppercase text-[11px]">
        Triveni Quality Certification Standard
      </span>
    </div>
  </div>
</section>


      {/* 2. MATERIAL PROFILE (ABOUT) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Frame */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent">
                Material Profile
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl text-primary font-medium leading-tight">
              {aboutTitle}
            </h2>

            <p className="font-body text-secondary text-base font-normal leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>
          </div>

          {/* Right Visual Frame */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-brand rounded-editorial p-3 shadow-card overflow-hidden">
              <div className="aspect-[4/3] rounded-editorial-sm overflow-hidden bg-soft relative">
                <img
                  src={aboutImage}
                  alt={aboutTitle}
                  className="w-full h-full object-cover transition-editorial hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL APPLICATIONS GRID */}
      {applications && applications.length > 0 && (
        <section className="bg-soft border-y border-brand py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand pb-4 mb-8">
              <div>
                <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent block mb-1">
                  Design Possibilities
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl text-primary font-medium">
                  Architectural Applications
                </h2>
              </div>
              <span className="font-ui text-xs font-semibold text-secondary mt-2 sm:mt-0">
                {applications.length} Primary Contexts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="group bg-card border border-brand hover:border-brand-medium rounded-editorial-sm p-5 transition-editorial shadow-soft flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="font-ui text-xs font-bold text-accent bg-soft px-2.5 py-1 rounded-md border border-brand shrink-0">
                      0{index + 1}
                    </span>
                    <h3 className="font-ui text-sm font-semibold text-primary truncate group-hover:text-accent transition-editorial">
                      {app.name}
                    </h3>
                  </div>
                  <div className="text-secondary group-hover:text-accent transition-editorial shrink-0 ml-2">
                    {app.icon || <ChevronRight size={16} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. INTERACTIVE SLAB MATRIX EXHIBIT */}
      <section id="gallery" className="py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 scroll-mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand pb-6 mb-10 gap-4">
          <div>
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent block mb-1">
              Curated Lots
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-primary font-medium">
              Slab Inventory & Pattern Preview
            </h2>
          </div>

          {/* Dynamic Switcher */}
          <div className="flex flex-wrap gap-2">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-editorial-sm font-ui text-xs font-bold tracking-wider transition-editorial cursor-pointer ${
                  activeIndex === idx
                    ? "bg-primary text-inverse shadow-soft"
                    : "bg-soft border border-brand text-secondary hover:text-primary hover:border-brand-medium"
                }`}
              >
                Lot 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Gallery Item Showcase */}
        {gallery[activeIndex] && (() => {
          const activeItem = gallery[activeIndex];
          return (
            <div className="bg-card border border-brand rounded-editorial p-6 sm:p-10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="aspect-[16/10] rounded-editorial-sm overflow-hidden bg-soft border border-brand shadow-soft">
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="h-full w-full object-cover transition-editorial hover:scale-102"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                    Quarry Origin: {activeItem.origin || "Italy"}
                  </span>
                  <h3 className="font-heading text-3xl text-primary font-medium">
                    {activeItem.name}
                  </h3>
                </div>

                <div className="p-4 bg-soft border border-brand rounded-editorial-sm font-ui text-xs text-secondary space-y-2">
                  <div className="flex justify-between border-b border-brand pb-2">
                    <span className="font-semibold text-primary">Surface Polish</span>
                    <span>High Gloss Mirror Finish</span>
                  </div>
                  <div className="flex justify-between border-b border-brand pb-2">
                    <span className="font-semibold text-primary">Slab Thickness</span>
                    <span>18mm - 20mm Standard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-primary">Structural Uniformity</span>
                    <span>Grade A Premium</span>
                  </div>
                </div>

                <a
                  href="#inquiry"
                  className="w-full bg-primary hover:bg-[#13205D] text-inverse font-ui text-xs uppercase tracking-widest font-bold py-3.5 rounded-editorial-sm transition-editorial shadow-soft inline-flex items-center justify-center gap-2 !text-white"
                >
                  Reserve Lot Specification <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5. TECHNICAL PERFORMANCE FEATURES */}
      {features && features.length > 0 && (
        <section className="bg-soft border-y border-brand py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl mb-12">
              <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                Physical Performance
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-primary font-medium">
                Technical Tolerances & Endurance
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, index) => (
                <div 
                  key={index} 
                  className="bg-card border border-brand rounded-editorial p-6 shadow-card hover:border-brand-medium transition-editorial space-y-3"
                >
                  <span className="font-ui text-xs font-bold text-accent uppercase tracking-wider block">
                    Feature 0{index + 1}
                  </span>
                  <h3 className="font-heading text-xl text-primary font-medium">
                    {feat.title}
                  </h3>
                  <p className="font-body text-secondary text-sm font-normal leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. TACTILE FINISHES OVERVIEW */}
      {finishes && finishes.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-12">
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent block mb-2">
              Tactile Presentation
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-primary font-medium">
              Surface Alteration Finishes
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Display Image Frame */}
            <div className="lg:col-span-7 bg-card p-3 border border-brand rounded-editorial shadow-card">
              <div className="aspect-[16/10] rounded-editorial-sm overflow-hidden bg-soft">
                <img
                  src={finishes[activeFinish]?.image}
                  alt={finishes[activeFinish]?.name}
                  className="w-full h-full object-cover transition-editorial"
                />
              </div>
            </div>

            {/* List Controllers */}
            <div className="lg:col-span-5 divide-y divide-brand border-y border-brand">
              {finishes.map((fin, index) => {
                const isSelected = activeFinish === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveFinish(index)}
                    className="py-5 cursor-pointer transition-editorial group"
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className={`font-heading text-xl font-medium transition-editorial ${
                          isSelected ? "text-accent" : "text-primary group-hover:text-accent"
                        }`}
                      >
                        {fin.name}
                      </h3>
                      <span className={`font-ui text-xs font-bold ${isSelected ? "text-accent" : "text-muted"}`}>
                        0{index + 1}
                      </span>
                    </div>
                    {isSelected && (
                      <p className="font-body text-secondary text-sm leading-relaxed mt-2 animate-fadeIn">
                        {fin.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. PROCUREMENT MANDATES */}
      {whyChoose && whyChoose.length > 0 && (
        <section className="bg-soft border-y border-brand py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-3">
              <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent block">
                The Procurement Studio
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-primary font-medium">
                The Triveni Mandate Standard
              </h2>
              <p className="font-body text-secondary text-sm leading-relaxed">
                Our uncompromising standard guarantees structural soundness, genuine lot consistency, and seamless delivery for your designs.
              </p>
            </div>

            <div className="lg:col-span-7 bg-card border border-brand rounded-editorial p-6 sm:p-8 shadow-card divide-y divide-brand">
              {whyChoose.map((item, index) => (
                <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span className="font-heading text-lg text-primary font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. INQUIRY / CONCIERGE CTA */}
      <section id="inquiry" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 scroll-mt-10">
        <div className="bg-card border border-brand rounded-editorial p-8 sm:p-16 shadow-card text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="font-ui text-xs font-bold uppercase tracking-widest text-accent block">
              Specification Support Blueprint
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl text-primary font-medium leading-tight">
              Integrate {title} <br /> Into Your Layouts
            </h2>
            <p className="font-body text-secondary text-base font-normal leading-relaxed">
              Our studio layout specialists interface directly with procurement document vectors to streamline batch variations flawlessly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <a
                href="tel:+919953226549"
                className="w-full sm:w-auto bg-primary hover:bg-[#13205D] text-inverse font-ui text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-editorial-sm transition-editorial shadow-soft inline-flex items-center justify-center gap-2 !text-white"
              >
                <Phone size={14} /> Schedule Phone Consultation
              </a>
              <a
                href="mailto:info@trivenigranite.com"
                className="w-full sm:w-auto bg-soft hover:bg-brand border border-brand text-primary font-ui text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-editorial-sm transition-editorial inline-flex items-center justify-center gap-2"
              >
                <Calendar size={14} className="text-accent" /> Book Studio Desk Visit
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductsPage;
