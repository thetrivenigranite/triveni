import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { 
  ArrowUpRight, 
  Clock, 
  Mail, 
  MapPin, 
  Phone, 
  Plus, 
  Minus,
  ChevronDown,
  Sparkles,
  Compass,
  CheckCircle2,
  Building2
} from "lucide-react";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [clientType, setClientType] = useState("Homeowner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "idle", text: "" });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    projectType: "Residential",
    message: ""
  });

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          projectType: formData.projectType,
          clientType: clientType,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitMessage({
        type: "success",
        text: "Thank you! We have received your inquiry."
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        projectType: "Residential",
        message: "",
      });

      setClientType("Homeowner");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setSubmitMessage({
        type: "error",
        text: "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clientTypes = ["Homeowner", "Architect", "Interior Designer", "Builder"];

  const faqs = [
    { 
      q: "Do you provide on-site installation?", 
      a: "We collaborate directly with your contractors and architects on-site to verify structural foundations, slab transitions, and precision joint alignments before and during installation." 
    },
    { 
      q: "Can we request material samples?", 
      a: "Yes. Designers and clients can request premium cut sample tiles to verify surface textures, coloration variations, and stone patterns under your site’s specific lighting." 
    },
    { 
      q: "How do you handle large-scale commercial orders?", 
      a: "We work directly with commercial quarries to secure matching slab bundles for large exterior facades, high-traffic flooring installations, and uniform architectural surfaces." 
    },
    { 
      q: "Should I book an appointment before visiting?", 
      a: "While walk-ins are welcome, scheduling an appointment ensures a dedicated stone consultant is available to guide you through our current slab lots and private inventory." 
    }
  ];

  return (
    <div className="bg-[#f7f5ef] text-gray-900 font-ui antialiased min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 bg-white border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Key Message */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f7f5ef] border border-gray-200 rounded-full mb-6 shadow-sm">
                <Sparkles size={13} className="text-amber-700" />
                <span className="font-ui text-xs font-bold uppercase tracking-wider text-gray-900">
                  Triveni Studio Concierge
                </span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-medium tracking-tight mb-6 leading-[1.12]">
                Shape your space with <br />
                <span className="italic text-gray-800 font-normal">raw geological artistry.</span>
              </h1>
              
              <p className="font-sans text-gray-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-8">
                Connect directly with our stone curators to coordinate architectural layouts, custom quarry selections, and precise project specifications.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href="#inquiry" 
                  className="bg-gray-900 hover:bg-gray-800 !text-white font-ui text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-xl transition-all shadow-sm inline-flex items-center gap-2"
                >
                  Initiate Project Brief <ArrowUpRight size={14} />
                </a>
                <a 
                  href="tel:+919953226549" 
                  className="bg-[#f7f5ef] hover:bg-gray-100 border border-gray-200 text-gray-900 font-ui text-xs uppercase tracking-widest font-bold px-6 py-4 rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <Phone size={14} className="text-amber-700" /> Direct Line
                </a>
              </div>
            </div>

            {/* Right Column: Curated Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#f7f5ef] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <span className="font-ui text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center gap-2">
                      <Building2 size={15} /> Showroom Hub
                    </span>
                    <span className="font-ui text-[11px] font-semibold bg-white px-2.5 py-1 rounded-full text-gray-600 border border-gray-200">
                      Mohali, Sector 82
                    </span>
                  </div>

                  <div className="aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                    <img 
                      src="https://res.cloudinary.com/vochf18f/image/upload/v1785387486/IMG_5064_whlonq.jpg" 
                      alt="Triveni Studio Interior" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 font-ui text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-amber-700 shrink-0" />
                      <span>Italian Statuario & Brazilian Quartzites on display</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-amber-700 shrink-0" />
                      <span>In-house architectural & design consultation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & INQUIRY FORM */}
      <section id="inquiry" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 scroll-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div>
              <span className="font-ui text-xs font-bold tracking-widest text-amber-700 uppercase block mb-2">
                Project Alignment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-medium leading-tight">
                Let us organize your delivery specifications.
              </h2>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-4">
                <div className="p-3 bg-[#f7f5ef] rounded-xl text-amber-700 shrink-0 border border-gray-200">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-ui text-xs font-bold uppercase tracking-wider text-gray-900">Studio Location</h3>
                  <p className="font-sans text-gray-600 text-xs sm:text-sm font-normal mt-1 leading-relaxed">
                    Sco 1014-B, Industrial Area Mohali, JLPL, Sector 82, Mohali-140308, Punjab
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-4">
                <div className="p-3 bg-[#f7f5ef] rounded-xl text-amber-700 shrink-0 border border-gray-200">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-ui text-xs font-bold uppercase tracking-wider text-gray-900">Operating Hours</h3>
                  <p className="font-sans text-gray-600 text-xs sm:text-sm font-normal mt-1 leading-relaxed">
                    Mon - Sat : 10:00 AM – 7:30 PM <br />
                    Sunday : 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 text-amber-700 mb-2">
                    <Phone size={15} />
                    <span className="font-ui text-[10px] uppercase font-bold tracking-wider">Phone</span>
                  </div>
                  <a href="tel:+919953226549" className="font-sans text-xs sm:text-sm font-medium text-gray-900 hover:text-amber-700 transition-all block">
                    +91 99532 26549
                  </a>
                </div>

                <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 text-amber-700 mb-2">
                    <Mail size={15} />
                    <span className="font-ui text-[10px] uppercase font-bold tracking-wider">Email</span>
                  </div>
                  <a href="mailto:info@trivenigranite.com" className="font-sans text-xs sm:text-sm font-medium text-gray-900 hover:text-amber-700 transition-all block truncate">
                    info@trivenigranite.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Selection */}
              <div className="space-y-2">
                <label className="font-ui text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Identify Profile Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {clientTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setClientType(type)}
                      className={`px-3 py-2.5 font-ui text-xs font-bold tracking-wide rounded-xl transition-all cursor-pointer ${
                        clientType === type
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-[#f7f5ef] text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-semibold text-gray-900">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Devendra Singh"
                    className="w-full bg-[#f7f5ef] border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-semibold text-gray-900">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full bg-[#f7f5ef] border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-semibold text-gray-900">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-[#f7f5ef] border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-ui text-xs font-semibold text-gray-900">City / Location</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mohali"
                    className="w-full bg-[#f7f5ef] border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-ui text-xs font-semibold text-gray-900">Project Format</label>
                <div className="relative">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-[#f7f5ef] border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-gray-900 focus:outline-none focus:border-gray-400 appearance-none cursor-pointer transition-all"
                  >
                    <option value="Residential">Residential Space</option>
                    <option value="Commercial">Commercial / Retail Building</option>
                    <option value="Custom Countertops">Kitchen Countertops & Vanities</option>
                    <option value="Facade">Exterior Cladding</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-ui text-xs font-semibold text-gray-900">Design Specifications & Requirements</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe dimensional layouts, surface finishes, or volume estimates..."
                  className="w-full bg-[#f7f5ef] border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-ui text-xs uppercase tracking-widest font-bold py-4 rounded-xl transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isSubmitting ? "Transmitting..." : "Transmit Specifications"}
              </button>

              {submitMessage.text && (
                <p className={`text-xs font-medium text-center ${submitMessage.type === "success" ? "text-emerald-600" : "text-rose-600"}`}>
                  {submitMessage.text}
                </p>
              )}

            </form>
          </div>

        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="bg-[#f7f5ef] border-y border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <span className="font-ui text-xs font-bold tracking-widest uppercase text-amber-700 block mb-2">
                Live Studio Location
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-medium">
                Experience raw stone lots in person.
              </h2>
            </div>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Triveni+-+The+Granite+Studio+Mohali" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-5 py-3 rounded-xl font-ui text-xs font-bold uppercase tracking-wider text-gray-900 transition-all shadow-sm shrink-0"
            >
              <Compass size={16} className="text-amber-700" /> Get Route Directions <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
            <iframe 
              title="Triveni Studio Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.3307131669185!2d76.73176017529802!3d30.65281458949114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390febe4f1ef0c7d%3A0xe059211a590ea2fb!2sTriveni%20-%20The%20Granite%20Studio!5e0!3m2!1sen!2sin!4v1781078991438!5m2!1sen!2sin" 
              className="w-full h-full border-0"
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-20">
        <div className="text-center mb-12">
          <span className="font-ui text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2">
            Assistance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-medium">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="py-5 cursor-pointer group"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between text-gray-900">
                  <h3 className="font-serif text-xl font-medium group-hover:text-amber-700 transition-all">
                    {faq.q}
                  </h3>
                  <div className="text-gray-600 group-hover:text-amber-700 transition-all ml-4 shrink-0 p-1.5 rounded-full bg-[#f7f5ef] border border-gray-200">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
                {isOpen && (
                  <div className="mt-3 font-sans text-gray-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
