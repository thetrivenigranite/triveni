import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logoMain from "../assets/logoTriveni.png";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  
  { name: "Projects", href: "/projects" },
  {
    name: "Products",
    href: "#",
    isMegaMenu: true,
    megaSections: [
      {
        title: "Natural Stone",
        items: [
          { label: "Granite", href: "/granite" },
          { label: "Sandstone", href: "/sandstone" },
          { label: "Limestone", href: "/limestone" },
          { label: "Quartz", href: "/quartz" },
          { label: "Onyx", href: "/onyx" },
        ],
      },
      {
        title: "Flooring",
        items: [
          { label: "Wooden flooring", href: "/wooden-flooring" },
          { label: "Thermopine / Thermoash", href: "/thermopine" },
          { label: "Wpc Decking", href: "/wpc-decking" },
        ],
      },
      {
        title: "Cladding",
        items: [
          { label: "I clad", href: "/i-clad" },
          { label: "Wpc panelling", href: "/wpc-panelling" },
        ],
      },
      {
        title: "Tiles",
        items: [
          { label: "Ispira", href: "/ispira" },
          { label: "Arvia", href: "/arvia" },
          { label: "Marfil", href: "/marfil" },
          { label: "Monolith", href: "/monolith" },
        ],
      },
      {
        title: "Custom-Products",
        items: [
          { label: "Marble Furniture", href: "/marble-furniture" },
          { label: "Wash Basin", href: "/wash-basin" },
          { label: "Bath Tub", href: "/bath-tub" },
          { label: "Wall Murals", href: "/wall-murals" },
          { label: "Marble Artifacts", href: "/marble-artifacts" },
          { label: "Marble Fountain", href: "/marble-fountain" },
        ],
      },
    ],
  },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false);
          setHoveredLink(null);
        } else {
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
    setHoveredLink(null);
  };

  const handleEnquireClick = () => {
    closeMenu();
    navigate("/contact");
  };

  const productsLink = NAV_LINKS.find((l) => l.isMegaMenu);

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md shadow-soft border-b border-[var(--border-light)] transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center px-5 md:px-10 lg:px-[120px]">
        
        {/* Brand Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center justify-start min-w-0 transition-all duration-300 hover:opacity-85 active:scale-[0.98]"
          style={{ height: "48px" }}
        >
          <img
            src={logoMain}
            alt="Triveni - The Granite Studio"
            className="block shrink-0"
            style={{
              height: "104px",
              maxHeight: "144px",
              width: "auto",
              maxWidth: "200px",
              objectFit: "contain",
              objectPosition: "left",
            }}
          />
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[32px] lg:flex">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              className="relative py-6"
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <NavLink
                to={link.href}
                className={({ isActive }) => {
                  const isCurrentActive = isActive && link.href !== "#";
                  const isHovered = hoveredLink === link.name;
                  return `group flex items-center gap-1.5 whitespace-nowrap font-ui text-[14px] font-medium leading-none tracking-wide transition-colors duration-200 ${
                    isCurrentActive || isHovered
                      ? "text-[var(--color-accent)]"
                      : "text-primary"
                  }`;
                }}
              >
                {({ isActive }) => {
                  const isCurrentActive = isActive && link.href !== "#";
                  const isHovered = hoveredLink === link.name;
                  return (
                    <>
                      <span>{link.name}</span>
                      
                      {/* Submenu Indicator Chevron */}
                      {(link.dropdownItems || link.isMegaMenu) && (
                        <ChevronDown
                          size={13}
                          strokeWidth={2.2}
                          className={`transition-transform duration-300 ease-out text-secondary ${
                            isHovered
                              ? "rotate-180 text-[var(--color-accent)]"
                              : ""
                          }`}
                        />
                      )}

                      {/* Animated Active/Hover Underline Bar */}
                      <span
                        className={`absolute bottom-[18px] left-0 h-[2px] rounded-full bg-[var(--color-accent)] transition-all duration-300 ease-out ${
                          isCurrentActive || isHovered
                            ? "w-full opacity-100"
                            : "w-0 opacity-0"
                        }`}
                      />
                    </>
                  );
                }}
              </NavLink>

              {/* Standard Dropdown Menu */}
              {link.dropdownItems && !link.isMegaMenu && (
                <div
                  className={`absolute left-1/2 top-[64px] min-w-[240px] -translate-x-1/2 rounded-editorial-sm border border-[var(--border-light)] bg-card py-2 shadow-card transition-all duration-200 ease-out ${
                    hoveredLink === link.name
                      ? "visible opacity-100 translate-y-0 pointer-events-auto"
                      : "invisible opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  {link.dropdownItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.href}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `group/item flex items-center justify-between border-l-2 px-4 py-2.5 font-ui text-[13px] font-medium transition-all duration-200 ${
                          isActive
                            ? "border-[var(--color-accent)] bg-soft text-[var(--color-accent)] font-semibold pl-5"
                            : "border-transparent text-primary hover:border-[var(--color-accent)] hover:bg-soft hover:text-[var(--color-accent)] hover:pl-5"
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-[var(--color-accent)] shrink-0"
                      />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Enquire CTA Button */}
        <button 
          onClick={handleEnquireClick}
          className="group ml-auto hidden h-[40px] min-w-[136px] items-center justify-center gap-1.5 rounded-full bg-primary px-5 font-ui text-[13px] font-semibold text-inverse tracking-wider uppercase transition-all duration-200 hover:bg-[#13205D] active:scale-[0.97] lg:flex shadow-soft cursor-pointer"
        >
          <span>Enquire Now</span>
          <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Navigation Menu"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-soft active:scale-95 lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mega Menu Dropdown */}
        {productsLink && (
          <div
            onMouseEnter={() => setHoveredLink("Products")}
            onMouseLeave={() => setHoveredLink(null)}
            className={`absolute left-5 right-5 md:left-10 md:right-10 lg:left-[120px] lg:right-[120px] top-[70px] rounded-editorial border border-t-0 border-[var(--border-light)] bg-card shadow-card transition-all duration-300 ease-out hidden lg:block overflow-hidden ${
              hoveredLink === "Products"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="p-8 bg-card">
              <div className="grid grid-cols-5 gap-6">
                {productsLink.megaSections.map((section) => (
                  <div key={section.title} className="flex flex-col">
                    <span className="font-ui text-[11px] uppercase tracking-[0.15em] font-bold text-[var(--color-accent)] mb-3 pb-1.5 border-b border-[var(--border-light)] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                      {section.title}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.href}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `group/mega flex items-center gap-1.5 font-ui text-[13px] font-medium py-1.5 transition-all duration-200 hover:translate-x-1 ${
                              isActive
                                ? "text-[var(--color-accent)] font-semibold"
                                : "text-primary hover:text-[var(--color-accent)]"
                            }`
                          }
                        >
                          <span className="h-1 w-1 rounded-full bg-[var(--color-accent)] opacity-0 transition-all duration-200 group-hover/mega:opacity-100" />
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Accordion Menu Dropdown */}
      <div
        className={`overflow-hidden bg-card transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-[850px] border-t border-[var(--border-light)] shadow-card" : "max-h-0"
        }`}
      >
        <div className="px-6 py-5">
          {NAV_LINKS.map((link) => (
            <div
              key={link.name}
              className="border-b border-[var(--border-light)] last:border-b-0"
            >
              {link.dropdownItems || link.isMegaMenu ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === link.name ? null : link.name
                      )
                    }
                    className={`flex w-full items-center justify-between py-3.5 font-ui text-[15px] font-medium transition-colors ${
                      openDropdown === link.name ? "text-[var(--color-accent)]" : "text-primary"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className={`transition-transform duration-200 text-secondary ${
                        openDropdown === link.name
                          ? "rotate-180 text-[var(--color-accent)]"
                          : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openDropdown === link.name
                        ? "grid-rows-[1fr] opacity-100 mb-2"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-3 border-l-2 border-[var(--border-light)] flex flex-col gap-1 my-1">
                        {link.isMegaMenu && link.megaSections
                          ? link.megaSections
                              .flatMap((s) => s.items)
                              .map((item) => (
                                <NavLink
                                  key={item.label}
                                  to={item.href}
                                  onClick={closeMenu}
                                  className={({ isActive }) =>
                                    `block py-1.5 px-3 rounded-editorial-sm font-ui text-[13px] font-medium transition-colors ${
                                      isActive
                                        ? "text-[var(--color-accent)] bg-soft font-semibold"
                                        : "text-secondary hover:text-primary hover:bg-soft"
                                    }`
                                  }
                                >
                                  {item.label}
                                </NavLink>
                              ))
                          : link.dropdownItems?.map((item) => (
                              <NavLink
                                key={item.label}
                                to={item.href}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                  `block py-1.5 px-3 rounded-editorial-sm font-ui text-[13px] font-medium transition-colors ${
                                    isActive
                                      ? "text-[var(--color-accent)] bg-soft font-semibold"
                                      : "text-secondary hover:text-primary hover:bg-soft"
                                  }`
                                }
                              >
                                {item.label}
                              </NavLink>
                            ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.href}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block py-3.5 font-ui text-[15px] font-medium transition-colors ${
                      isActive ? "text-[var(--color-accent)] font-semibold" : "text-primary hover:text-[var(--color-accent)]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}

          {/* Mobile Enquire Button */}
          <button 
            onClick={handleEnquireClick}
            className="mt-6 flex h-[44px] w-full items-center justify-center gap-2 rounded-full bg-primary font-ui text-[13px] font-semibold text-inverse tracking-wider uppercase transition-all duration-200 active:scale-[0.98] shadow-soft"
          >
            <span>Enquire Now</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
