import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  Tag,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Premium Unsplash placeholders curated for Triveni Architectural Standards
const BLOG_IMAGES = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
  graniteGuide:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000",
  graniteMarble:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
  quartzGranite:
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000",
  woodTile:
    "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=1000",
  claddingTrends:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
  stoneTrends:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000",
  contentInner:
    "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1000",
};

// Complete structured database for the initial 6 launch blogs
const ALL_BLOGS = [
  {
    id: 1,
    slug: "how-to-choose-the-right-granite-for-your-home",
    title: "The Ultimate Guide to Choosing Granite for Your Home",
    excerpt:
      "Selecting the ideal granite slab requires balancing geological density, vitreous crystalline arrays, and color depth configurations. Discover our technical screening framework.",
    category: "Stone Guides",
    author: "Ritesh Sharma",
    date: "June 08, 2026",
    image: BLOG_IMAGES.graniteGuide,
    isFeatured: true,
    introduction:
      "Granite stands as an unparalleled architectural hallmark of structural resilience and raw organic expression. However, integrating it flawlessly into a high-end layout demands deep technical consideration.",
    contentBlocks: [
      {
        heading: "1. Assessing Crystalline Density & Porosity Matrix",
        text: "Not all granite slabs share the same structural integrity. High-traffic residential zones require materials with micro-compact grain distributions. Always check for tight crystalline bonds on cross-sections to ensure minimal water stagnation risks.",
      },
      {
        heading: "2. Color Matching & Light Specularity",
        text: "Premium options like Black Galaxy or Alaska White respond beautifully to directional spotlights. Consider how room illumination values will interact with your stone surface finish—whether it reflects brilliantly or absorbs glare smoothly.",
      },
    ],
    takeaways: [
      "Prioritize dense igneous material structures for high-use culinary areas.",
      "Calibrate surface seals every 24 months to neutralize potential liquid stains.",
      "Review raw slabs in broad daylight before signing off on final cuts.",
    ],
  },
  {
    id: 2,
    slug: "granite-vs-marble-complete-comparison",
    title: "Granite vs Marble: Complete Engineering & Aesthetic Comparison",
    excerpt:
      "An in-depth structural breakdown contrasting plutonic igneous formations against metamorphic crystalline limestone blocks.",
    category: "Material Comparison",
    author: "Anya Malhotra",
    date: "June 02, 2026",
    image: BLOG_IMAGES.graniteMarble,
    isFeatured: false,
    introduction:
      "Architects and luxury builders frequently face a decisive crossroads: select the raw hardness of granite or the soft, sweeping luxury veining of genuine marble.",
    contentBlocks: [
      {
        heading: "The Hardness Vector (Mohs Scale Metrics)",
        text: "Granite sits securely at 6–7 on the Mohs scale, brushing off metal utility scratches easily. Marble, as a softer calcitic crystalline structure, sits closer to 3–4, making it more responsive to patina development over long timelines.",
      },
    ],
    takeaways: [
      "Use granite for high-traffic work surfaces and outdoor facades.",
      "Reserve marble for elegant vertical features, low-friction bathrooms, and classic furniture details.",
    ],
  },
  {
    id: 3,
    slug: "quartz-vs-granite-which-is-better",
    title: "Quartz vs Granite: Which is Better for High-Traffic Kitchens?",
    excerpt:
      "Evaluating human-engineered polymer-bound quartz crystals against pure plutonic quarry slabs in premium culinary workspaces.",
    category: "Material Comparison",
    author: "Ritesh Sharma",
    date: "May 28, 2026",
    image: BLOG_IMAGES.quartzGranite,
    isFeatured: false,
    introduction:
      "Modern premium kitchen plans require worktops that can easily handle high thermal stress, localized impacts, and acidic culinary fluids.",
    contentBlocks: [
      {
        heading: "Engineered Resilience vs. Organic Variation",
        text: "Engineered quartz offers absolute structural predictability with zero surface pores, making it incredibly stain resistant. Natural granite, conversely, delivers irreplaceable, one-of-a-kind stone patterns forged across millennia.",
      },
    ],
    takeaways: [
      "Quartz excels in ultra-sterile, zero-maintenance contemporary kitchens.",
      "Granite brings timeless artistic prestige and handles blistering skillet heat effortlessly.",
    ],
  },
  {
    id: 4,
    slug: "wooden-flooring-vs-tile-flooring",
    title: "Wooden Flooring vs Tile Flooring: The Luxury Conundrum",
    excerpt:
      "Analysing cross-laminated engineered timber warmth metrics against the vitreous thermal conductivity of premium porcelain surfaces.",
    category: "Flooring Solutions",
    author: "Vikram Malhotra",
    date: "May 19, 2026",
    image: BLOG_IMAGES.woodTile,
    isFeatured: false,
    introduction:
      "The flooring layer establishes the structural baseline for your entire interior environment, dictating both acoustics and thermal comfort.",
    contentBlocks: [
      {
        heading: "Acoustic Insulation & Thermal Responsiveness",
        text: "Engineered wood uses multi-layer core arrangements to soften footstep resonance, offering a warm tactile feel. Premium large-format tiles yield incredible surface hardness and coordinate perfectly with radiant floor heating loops.",
      },
    ],
    takeaways: [
      "Select engineered timber to introduce organic character into bedrooms and library wings.",
      "Opt for high-end tiles in high-moisture entryways and transition areas.",
    ],
  },
  {
    id: 5,
    slug: "exterior-cladding-trends-for-modern-homes",
    title: "Exterior Cladding Trends for Modern High-Performance Homes",
    excerpt:
      "Unveiling modern trends in intelligent facades, ventilated curtain tracks, and advanced I-Clad thermal systems.",
    category: "Exterior Cladding",
    author: "Ritesh Sharma",
    date: "May 10, 2026",
    image: BLOG_IMAGES.claddingTrends,
    isFeatured: false,
    introduction:
      "Modern high-end building envelopes do more than just block seasonal weather—they actively manage thermal transfers and emphasize bold shapes.",
    contentBlocks: [
      {
        heading: "The Rise of Ventilated Pressure-Equalized Assemblies",
        text: "Architects are quickly moving away from wet-mortar cladding towards dry-hung interlocking track designs. These assemblies allow building walls to breathe, permanently blocking water stagnation issues.",
      },
    ],
    takeaways: [
      "Insulated cladding dramatically cuts baseline HVAC electrical draw.",
      "Dry mechanical tracks shift safely with seismic micro-oscillations.",
    ],
  },
  {
    id: 6,
    slug: "top-natural-stone-trends-for-luxury-interiors",
    title: "Top Natural Stone Trends for Luxury Interiors in 2026",
    excerpt:
      "Exploring the shifting design codes prioritizing massive bookmatched islands, bold textures, and raw, unpolished finishes.",
    category: "Design Inspiration",
    author: "Kavita Rao",
    date: "April 29, 2026",
    image: BLOG_IMAGES.stoneTrends,
    isFeatured: false,
    introduction:
      "This year, elite interior spaces are celebrating bold material honesty over heavily modified, ultra-glossy surfaces.",
    contentBlocks: [
      {
        heading: "Monolithic Blocks and Low-Specular Finishes",
        text: "Design patterns focus on thick, raw stone block structures displaying complex, deep-set mineral veining. Leathered and honed finishes are taking center stage, offering a rich, understated tactile feel.",
      },
    ],
    takeaways: [
      "Bookmatched features serve as prominent, one-of-a-kind fine art elements.",
      "Honed and textured surfaces bring a soft, sophisticated elegance to architectural spaces.",
    ],
  },
];

const CATEGORIES = [
  "All Articles",
  "Stone Guides",
  "Design Inspiration",
  "Flooring Solutions",
  "Exterior Cladding",
  "Material Comparison",
  "Maintenance Tips",
  "Project Showcases",
];

const Blogs = () => {
  const nav = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [activeBlog, setActiveBlog] = useState(null);

  // Filtered post calculation
  const filteredBlogs =
    selectedCategory === "All Articles"
      ? ALL_BLOGS.filter((b) => !b.isFeatured)
      : ALL_BLOGS.filter(
          (b) => b.category === selectedCategory && !b.isFeatured,
        );

  const featuredBlog = ALL_BLOGS.find((b) => b.isFeatured);

  // Auto scroll reset on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeBlog, selectedCategory]);

  const handleArticleClick = (blog) => {
    setActiveBlog(blog);
    window.history.pushState(null, "", `/blog/${blog.slug}`);
  };

  const handleBackToFeed = () => {
    setActiveBlog(null);
    window.history.pushState(null, "", `/blog`);
  };

  return (
    <div className="bg-brand text-primary font-body antialiased min-h-screen selection:bg-accent selection:text-white select-none">
      {/* ------------------ MAIN BLOG FEED LAYOUT ------------------ */}
      {!activeBlog ? (
        <div>
          {/* Hero Section */}
          <section className="relative pt-24 pb-16 border-b border-brand overflow-hidden bg-card">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#161616_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
              <span className="font-ui text-xs uppercase tracking-[0.2em] text-accent font-bold inline-flex items-center gap-2 mb-4">
                <Sparkles size={13} className="text-accent" /> Insights &
                Inspirations
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary font-medium tracking-tight mb-6 max-w-4xl mx-auto leading-[1.12]">
                Discover trends, materials, design ideas, and expert guidance.
              </h1>
              <p className="font-body text-secondary text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                Curated architectural perspectives and material intelligence
                blueprints designed to elevate premium structural spaces.
              </p>
            </div>
          </section>

          {/* Featured Article Section */}
          {featuredBlog && selectedCategory === "All Articles" && (
            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
              <div
                onClick={() => handleArticleClick(featuredBlog)}
                className="group cursor-pointer bg-card border border-brand rounded-editorial-lg overflow-hidden shadow-soft hover:shadow-hover hover:border-brand-medium transition-editorial grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                <div className="lg:col-span-7 overflow-hidden relative min-h-[340px] lg:min-h-[480px]">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-editorial"
                  />
                  <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand shadow-soft">
                    <span className="font-ui text-[11px] uppercase tracking-widest font-bold text-primary flex items-center gap-1.5">
                      <Sparkles size={11} className="text-accent" /> Featured
                      Article
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-card">
                  <div className="flex items-center gap-4 text-xs mb-6">
                    <span className="font-ui text-xs font-semibold text-accent uppercase tracking-wider">
                      {featuredBlog.category}
                    </span>
                    <span className="text-muted">•</span>
                    <span className="font-number text-xs text-muted font-medium">
                      {featuredBlog.date}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary font-medium tracking-tight mb-4 group-hover:text-accent transition-editorial leading-[1.2]">
                    {featuredBlog.title}
                  </h2>
                  <p className="font-body text-secondary font-normal text-sm sm:text-base leading-relaxed mb-8 line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-brand flex items-center justify-between">
                    <span className="font-ui text-xs text-muted font-medium flex items-center gap-1.5">
                      <User size={12} className="text-accent" /> By{" "}
                      {featuredBlog.author}
                    </span>
                    <span className="font-ui text-xs tracking-wider uppercase font-bold inline-flex items-center gap-1 text-primary group-hover:text-accent group-hover:translate-x-1 transition-editorial">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Categories Navigation Bar */}
          <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-6">
            <div className="border-b border-brand pb-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 lg:mx-0 lg:px-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-ui text-xs font-bold tracking-wide whitespace-nowrap transition-editorial ${
                      selectedCategory === cat
                        ? "bg-primary text-inverse shadow-soft"
                        : "bg-card text-secondary border border-brand hover:text-primary hover:border-brand-medium"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Luxury 3-Column Blog Grid */}
          <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-24">
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    onClick={() => handleArticleClick(blog)}
                    className="group cursor-pointer bg-card border border-brand rounded-editorial overflow-hidden shadow-soft hover:shadow-card hover:border-brand-medium transition-editorial flex flex-col h-full"
                  >
                    <div className="relative overflow-hidden aspect-[16/10] bg-soft">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-editorial"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-card/90 backdrop-blur-md px-2.5 py-1 rounded-editorial-sm font-ui text-[10px] uppercase tracking-widest font-bold text-primary border border-brand shadow-soft">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <span className="font-number text-[11px] text-muted mb-3 block font-medium">
                        {blog.date}
                      </span>
                      <h3 className="font-heading text-xl font-medium text-primary tracking-tight mb-2 group-hover:text-accent transition-editorial line-clamp-2 leading-[1.3]">
                        {blog.title}
                      </h3>
                      <p className="font-body text-secondary text-xs sm:text-sm font-normal leading-relaxed mb-6 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-brand flex items-center justify-between">
                        <span className="font-ui text-[11px] text-muted font-medium flex items-center gap-1">
                          <User size={11} className="text-accent" />{" "}
                          {blog.author}
                        </span>
                        <span className="font-ui text-xs font-bold tracking-wide uppercase inline-flex items-center gap-1 text-primary group-hover:text-accent group-hover:gap-2 transition-editorial">
                          Read More <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-editorial border border-dashed border-brand-medium">
                <Compass
                  size={32}
                  className="mx-auto text-muted mb-4 stroke-1"
                />
                <p className="font-body text-muted text-sm font-normal">
                  No articles initialized under this specific taxonomy yet.
                </p>
              </div>
            )}
          </section>
        </div>
      ) : (
        /* ------------------ SINGLE BLOG DETAIL LAYOUT ------------------ */
        <div className="bg-card">
          {/* Back Navigation Bar */}
          <div className="bg-brand/80 backdrop-blur-md border-b border-brand sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              <button
                onClick={handleBackToFeed}
                className="inline-flex items-center gap-2 font-ui text-xs font-bold uppercase tracking-wider text-secondary hover:text-accent transition-editorial"
              >
                <ArrowLeft size={14} /> Back to Insights
              </button>
              <span className="font-ui text-[11px] uppercase tracking-widest text-muted font-medium hidden sm:inline-block">
                Reading: {activeBlog.title}
              </span>
            </div>
          </div>

          {/* Article Header & Meta */}
          <header className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
            <span className="bg-soft text-accent font-ui font-bold px-3 py-1.5 rounded-editorial-sm text-xs uppercase tracking-widest inline-block mb-6 border border-brand">
              {activeBlog.category}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary font-medium tracking-tight mb-8 leading-[1.18] max-w-3xl mx-auto">
              {activeBlog.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 font-ui text-xs text-muted border-y border-brand py-4 max-w-xl mx-auto">
              <span className="flex items-center gap-1.5 text-primary font-semibold">
                <User size={13} className="text-accent" /> By{" "}
                {activeBlog.author}
              </span>
              <span className="hidden sm:inline-block text-brand-medium">
                |
              </span>
              <span className="flex items-center gap-1.5 font-number font-medium">
                <Calendar size={13} /> {activeBlog.date}
              </span>
              <span className="hidden sm:inline-block text-brand-medium">
                |
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Tag size={13} /> 5 Min Read
              </span>
            </div>
          </header>

          {/* Hero Big Image */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
            <div className="aspect-[21/9] rounded-editorial-lg overflow-hidden shadow-soft border border-brand bg-soft">
              <img
                src={activeBlog.image}
                alt={activeBlog.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Article Content Matrix */}
          <article className="max-w-3xl mx-auto px-6 text-primary font-body text-base sm:text-lg leading-relaxed">
            {/* Introduction paragraph */}
            <p className="font-heading text-xl sm:text-2xl text-primary font-medium leading-relaxed mb-10 border-l-2 border-accent pl-6 italic">
              {activeBlog.introduction}
            </p>

            {/* Dynamic Content Blocks */}
            {activeBlog.contentBlocks.map((block, index) => (
              <div key={index} className="mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-medium text-primary tracking-tight mb-4 mt-10">
                  {block.heading}
                </h2>
                <p className="font-body text-secondary text-base sm:text-lg font-normal leading-relaxed">
                  {block.text}
                </p>
              </div>
            ))}

            {/* Creative Interstitial In-line Image */}
            <div className="my-14 rounded-editorial overflow-hidden aspect-[16/9] shadow-soft border border-brand bg-soft">
              <img
                src={BLOG_IMAGES.contentInner}
                alt="Architectural detailing placeholder"
                className="w-full h-full object-cover"
              />
              <span className="font-ui text-xs text-muted mt-2 block text-center italic font-normal">
                Figure 1.1: Visualizing slab core distribution patterns under
                precise specular setups.
              </span>
            </div>

            {/* Structured Takeaways Card Container */}
            <div className="bg-soft border border-brand rounded-editorial p-6 sm:p-8 my-12 shadow-soft">
              <h3 className="font-ui text-xs uppercase tracking-[0.2em] font-bold text-primary mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" /> Key Material
                Takeaways
              </h3>
              <ul className="space-y-3.5 font-body text-secondary text-xs sm:text-sm">
                {activeBlog.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Related Articles Matrix Layout */}
          <section className="bg-soft border-t border-brand mt-24 py-16">
            <div className="max-w-5xl mx-auto px-6">
              <h4 className="font-ui text-xs uppercase tracking-[0.25em] font-bold text-accent mb-10 text-center">
                Keep Exploring Intelligence
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ALL_BLOGS.filter((b) => b.id !== activeBlog.id)
                  .slice(0, 2)
                  .map((related) => (
                    <div
                      key={related.id}
                      onClick={() => handleArticleClick(related)}
                      className="group cursor-pointer bg-card border border-brand p-6 rounded-editorial hover:border-brand-medium hover:shadow-soft transition-editorial flex flex-col"
                    >
                      <span className="font-ui text-[10px] uppercase tracking-widest font-bold text-accent mb-2 block">
                        {related.category}
                      </span>
                      <h5 className="font-heading text-lg font-medium text-primary tracking-tight mb-2 group-hover:text-accent transition-editorial line-clamp-1">
                        {related.title}
                      </h5>
                      <p className="font-body text-secondary text-xs font-normal line-clamp-2 mb-4 leading-relaxed">
                        {related.excerpt}
                      </p>
                      <span className="font-ui text-xs font-bold text-primary group-hover:text-accent inline-flex items-center gap-1 mt-auto group-hover:translate-x-1 transition-editorial">
                        Read Post <ArrowRight size={12} />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ------------------ MONOLITHIC CONSULTATION CTA ------------------ */}
      <section className="bg-[#111111] text-inverse py-20 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="font-ui text-[11px] uppercase tracking-[0.3em] text-accent font-bold block mb-4">
            Architectural Advisory
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-white font-medium tracking-tight mb-4 max-w-2xl mx-auto leading-snug">
            Have a custom surface specification project in mind?
          </h2>
          <p className="font-body text-white/70 font-normal text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Connect directly with our engineering consultation desk for
            dedicated advice on planning material matrices, load boundaries, and
            visual styling patterns.
          </p>
          <button
            onClick={() => {
              nav("/contact")
            }}
            className="bg-accent text-white font-ui text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-accent-light transition-editorial shadow-card inline-flex items-center gap-2 group cursor-pointer"
          >
            Request Architectural Consultation
            <MessageSquare
              size={14}
              className="group-hover:translate-x-0.5 transition-editorial"
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
