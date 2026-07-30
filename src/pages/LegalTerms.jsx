import { Link } from "react-router-dom";

export default function LegalTerms() {
  const lastUpdated = "July 30, 2026";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "services", title: "2. Services & Products" },
    { id: "orders", title: "3. Orders & Custom Work" },
    { id: "ip", title: "4. Intellectual Property" },
    { id: "conduct", title: "5. User Conduct" },
    { id: "liability", title: "6. Limitation of Liability" },
    { id: "termination", title: "7. Termination" },
    { id: "contact", title: "8. Contact Information" },
  ];

  return (
    <div className="w-full bg-[#fafafa] font-ui min-h-screen text-gray-800 py-12 md:py-20 px-5 md:px-10 lg:px-[120px]">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Top Header Section */}
        <div className="border-b border-gray-200 pb-10 mb-12">
          <Link
            to="/"
            className="text-[13px] font-medium text-gray-400 hover:text-gray-900 transition-colors inline-flex items-center gap-2 mb-6 uppercase tracking-wider"
          >
            ← Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">
                Legal Information
              </span>
              <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
                Terms of Service
              </h1>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Last Updated: <span className="text-gray-800">{lastUpdated}</span>
            </p>
          </div>
        </div>

        {/* Main Content Grid: Sidebar + Main Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Sticky Navigation Directory */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-10 flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-3">
                On This Page
              </span>
              <nav className="flex flex-col gap-3">
                {sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:translate-x-1 transition-all duration-200"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Detailed Terms Text */}
          <main className="lg:col-span-8 flex flex-col gap-14 text-[15px] leading-relaxed text-gray-600">
            
            {/* 1. Acceptance */}
            <section id="acceptance" className="scroll-mt-10 flex flex-col gap-3">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                1. Acceptance of Terms
              </h2>
              <p className="leading-7">
                By accessing or using the website and services provided by <strong className="text-gray-900">Triveni - The Granite Studio</strong> ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not access or use our website or order custom stone products from us.
              </p>
            </section>

            {/* 2. Services & Products */}
            <section id="services" className="scroll-mt-10 flex flex-col gap-4 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                2. Services & Product Variations
              </h2>
              <p>
                Triveni specializes in natural stone, granite, bespoke marble furniture, tiles, cladding, and custom wash basins.
              </p>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-5 bg-white border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Natural Stone Characteristics</h3>
                  <p className="text-sm">Natural stone is a product of nature. Veining, color variations, fissures, and texture differences are inherent characteristics of natural materials and are not considered defects.</p>
                </div>
                <div className="p-5 bg-white border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Digital Samples & Display</h3>
                  <p className="text-sm">We make every effort to display product colors accurately on screen, but actual physical materials may vary slightly due to monitor settings and batch variations.</p>
                </div>
              </div>
            </section>

            {/* 3. Orders & Custom Work */}
            <section id="orders" className="scroll-mt-10 flex flex-col gap-4 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                3. Orders & Custom Fabrication
              </h2>
              <p>For custom stone cuts, murals, and bespoke furniture, specific order terms apply:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> All custom measurements submitted by the client must be final and verified before cutting.
                </li>
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> Advance deposits for custom marble and granite work are non-refundable once fabrication begins.
                </li>
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> Delivery timelines are estimates and subject to site readiness and raw material availability.
                </li>
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> Inspection of delivered stone items is required immediately upon delivery.
                </li>
              </ul>
            </section>

            {/* 4. Intellectual Property */}
            <section id="ip" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                4. Intellectual Property
              </h2>
              <p>
                All content on this website—including designs, text, graphics, logos, images, and custom product catalogs—is the exclusive property of <strong className="text-gray-900">Triveni - The Granite Studio</strong> and is protected by applicable copyright, trademark, and intellectual property laws.
              </p>
            </section>

            {/* 5. User Conduct */}
            <section id="conduct" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                5. User Conduct & Website Use
              </h2>
              <p>
                You agree not to misuse our website or assist anyone else in doing so. You may not attempt to extract site source code, bypass security protocols, or use automated systems to scrape product catalogs or pricing without express written permission.
              </p>
            </section>

            {/* 6. Limitation of Liability */}
            <section id="liability" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Triveni shall not be liable for any indirect, incidental, or consequential damages resulting from improper installation of stone products by third-party contractors, site misuse, or delays beyond our control.
              </p>
            </section>

            {/* 7. Termination */}
            <section id="termination" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                7. Termination of Service
              </h2>
              <p>
                We reserve the right to suspend access to our digital services or terminate client consultations in the event of fraudulent activity, breach of payment terms, or abusive conduct toward our team.
              </p>
            </section>

            {/* 8. Contact Card */}
            <section id="contact" className="scroll-mt-10 border-t border-gray-200 pt-12">
              <div className="bg-gray-900 text-white p-8 md:p-10 rounded-2xl flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">
                    Questions About Our Terms?
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">
                    Contact Legal Support
                  </h3>
                  <p className="text-gray-400 text-sm max-w-[360px]">
                    Have questions regarding custom orders, terms, or contracts?
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-300 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-8">
                  <p className="font-bold text-white uppercase text-xs tracking-wider">Triveni - The Granite Studio</p>
                  <p>Email: <a href="mailto:legal@trivenigranite.com" className="text-white underline hover:text-gray-300">info@trivenigranite.com</a></p>
                   <p>Phone: +91 9953226549</p>
                  <p>Address: Sco 1014-B, Industrial Area Mohali, JLPL, Sector 82, Mohali-140308, Punjab</p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
