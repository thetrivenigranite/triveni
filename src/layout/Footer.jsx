import { Link } from "react-router-dom";
import logoMain from "../assets/logoTriveni.png";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Projects", to: "/projects" },
      { label: "Blogs", to: "/blogs" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Surfaces",
    links: [
      { label: "Natural Stone", to: "/granite" },
      { label: "Flooring", to: "/wooden-flooring" },
      { label: "Cladding", to: "/i-clad" },
    ],
  },
  {
    title: "Tiles",
    links: [
      { label: "Dimore", to: "/dimore" },
      { label: "Ispira", to: "/ispira" },
      { label: "Arvia", to: "/arvia" },
      { label: "Marfil", to: "/marfil" },
    ],
  },
  {
    title: "Custom",
    links: [
      { label: "Marble Furniture", to: "/marble-furniture" },
      { label: "Wash Basin", to: "/wash-basin" },
      { label: "Bath Tub", to: "/bath-tub" },
      { label: "Wall Murals", to: "/wall-murals" },
      { label: "Artifacts", to: "/marble-artifacts" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#f7f5ef] font-ui text-gray-700">
      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16 lg:px-[120px]">
        <div className="grid grid-gap gap-12 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-6 rounded-[24px] border border-gray-200 bg-white/80 p-6 shadow-[0_18px_50px_rgba(17,17,17,0.04)] sm:p-8 lg:col-span-4">
            <Link
              to="/"
              className="inline-flex w-fit transition-opacity duration-300 hover:opacity-85"
            >
              <img
                src={logoMain}
                alt="Triveni - The Granite Studio"
                className="h-[72px] sm:h-[88px] w-auto object-contain object-left"
              />
            </Link>

            <p className="max-w-[360px] text-sm leading-relaxed text-gray-600">
              The Granite Studio. Transforming spaces with premium natural
              stone, cutting-edge flooring, and bespoke custom products.
            </p>

            <div className="flex flex-col gap-2.5 border-t border-gray-200 pt-5 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="mailto:info@trivenigranite.com"
                className="transition-colors duration-300 hover:text-gray-900 break-all"
              >
                info@trivenigranite.com
              </a>
              <a
                href="tel:+919953226549"
                className="transition-colors duration-300 hover:text-gray-900 whitespace-nowrap"
              >
                +91 99532 26549
              </a>
            </div>
          </div>

          {/* Navigation Columns Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-4 xl:pl-8">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-900">
                  {column.title}
                </h4>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="w-fit text-sm text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/70">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-6 text-[12px] tracking-[0.14em] sm:tracking-[0.18em] text-gray-500 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-[120px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold uppercase text-gray-900">
                TRIVENI - The Granite Studio
              </span>
              <span>© 2026. All rights reserved.</span>
            </div>

            <div className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

            <div className="flex items-center gap-2 uppercase">
              <span>Made by</span>
              <a
                href="https://wepromote.us"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-900 transition-colors duration-300 hover:text-[var(--color-accent)]"
              >
                WE PROMOTE
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-wrap gap-4 uppercase">
              <a
                href="/privacy"
                className="transition-colors duration-300 hover:text-gray-900"
              >
                Privacy Policy
              </a>
              <a
                href="/legal-terms"
                className="transition-colors duration-300 hover:text-gray-900"
              >
                Terms of Service
              </a>
            </div>

            <div className="hidden h-6 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/trivenigranites"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/trivenigranite/"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
