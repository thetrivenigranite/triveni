import { Link } from "react-router-dom";

export default function LegalPrivacy() {
  const lastUpdated = "July 30, 2026";

  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Information" },
    { id: "sharing", title: "4. Sharing & Disclosure" },
    { id: "cookies", title: "5. Cookies & Tracking" },
    { id: "security", title: "6. Data Security" },
    { id: "rights", title: "7. Your Rights" },
    { id: "contact", title: "8. Contact Us" },
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
                Privacy Policy
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

          {/* Detailed Policy Text */}
          <main className="lg:col-span-8 flex flex-col gap-14 text-[15px] leading-relaxed text-gray-600">
            
            {/* Introduction */}
            <section id="intro" className="scroll-mt-10 flex flex-col gap-3">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                1. Introduction
              </h2>
              <p className="leading-7">
                Welcome to <strong className="text-gray-900">Triveni - The Granite Studio</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or interact with our services for natural stone, custom furniture, and surfaces.
              </p>
            </section>

            {/* Information We Collect */}
            <section id="collection" className="scroll-mt-10 flex flex-col gap-4 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                2. Information We Collect
              </h2>
              <p>
                We collect information that you directly provide to us, as well as information collected automatically when you navigate our site:
              </p>
              <div className="grid grid-cols-1 gap-4 mt-2">
                <div className="p-5 bg-white border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Personal Data</h3>
                  <p className="text-sm">Name, email address, phone number, shipping/billing address, and project requirements provided via contact forms or product inquiries.</p>
                </div>
                <div className="p-5 bg-white border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Usage & Technical Data</h3>
                  <p className="text-sm">IP address, browser type, operating system, referring URLs, pages viewed, and access times collected via cookies and analytics.</p>
                </div>
                <div className="p-5 bg-white border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-1">Business Communication</h3>
                  <p className="text-sm">Correspondence between you and our support/design team regarding custom orders (wash basins, wall murals, marble furniture, etc.).</p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section id="usage" className="scroll-mt-10 flex flex-col gap-4 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                3. How We Use Your Information
              </h2>
              <p>We use the collected information for various legitimate business purposes, including:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> Processing consultation requests, quotes, and custom surface orders.
                </li>
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> Improving website functionality, product offerings, and user experience.
                </li>
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> Communicating regarding project updates, customer support, and administrative notices.
                </li>
                <li className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-md text-sm">
                  <span className="text-gray-900 font-bold">•</span> Ensuring the security and integrity of our digital platforms.
                </li>
              </ul>
            </section>

            {/* Sharing & Disclosure */}
            <section id="sharing" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                4. Data Sharing & Disclosure
              </h2>
              <p>
                We respect your privacy and <strong className="text-gray-900">do not sell or rent</strong> your personal information to third parties. We may share data only under strict conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><strong className="text-gray-800">Service Providers:</strong> Trusted third-party vendors who assist in operating our website, managing analytics, or delivering products (e.g., logistics partners).</li>
                <li><strong className="text-gray-800">Legal Requirements:</strong> If required by law, court order, or governmental authority to protect our rights or the safety of others.</li>
              </ul>
            </section>

            {/* Cookies */}
            <section id="cookies" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                5. Cookies & Tracking Technologies
              </h2>
              <p>
                Our website uses cookies and similar technologies to enhance user experience, analyze web traffic, and remember your site preferences. You can configure your web browser to decline cookies, though some features of our site may not function properly as a result.
              </p>
            </section>

            {/* Data Security */}
            <section id="security" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                6. Data Security
              </h2>
              <p>
                We implement reasonable administrative, technical, and physical security measures to protect your personal data from unauthorized access, loss, or alteration. However, please note that no transmission over the internet is completely bulletproof.
              </p>
            </section>

            {/* Your Rights */}
            <section id="rights" className="scroll-mt-10 flex flex-col gap-3 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold uppercase tracking-wide text-gray-900">
                7. Your Privacy Rights
              </h2>
              <p>
                Depending on your location, you have the right to access, update, correct, or request the deletion of your personal information. You can also opt out of promotional emails at any time by following the unsubscribe link in our messages.
              </p>
            </section>

            {/* Contact Us Card */}
            <section id="contact" className="scroll-mt-10 border-t border-gray-200 pt-12">
              <div className="bg-gray-900 text-white p-8 md:p-10 rounded-2xl flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">
                    Questions or Concerns?
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-2">
                    Contact Privacy Team
                  </h3>
                  <p className="text-gray-400 text-sm max-w-[360px]">
                    Reach out to our compliance team regarding any data protection inquiries.
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-300 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-8">
                  <p className="font-bold text-white uppercase text-xs tracking-wider">Triveni - The Granite Studio</p>
                  <p>Email: <a href="mailto:privacy@trivenigranite.com" className="text-white underline hover:text-gray-300">info@trivenigranite.com</a></p>
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
