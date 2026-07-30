import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import WpcDecking from "./pages/products/WPCdecking";
import Dimore from "./pages/products/Dimore";
import Ispira from "./pages/products/Ispira";
import Arvia from "./pages/products/Arvia";
import Marfil from "./pages/products/Marfil";
import Monolith from "./pages/products/Monolith";
import MarbleFurniture from "./pages/products/MarbleFurniture";
import WashBasin from "./pages/products/WashBasin";
import BathTub from "./pages/products/BathTub";
import WallMurals from "./pages/products/WallMurals";
import MarbleArtifacts from "./pages/products/MarbleArtifacts";
import MarbleFountain from "./pages/products/MarbleFountain";
import PrivacyPolicy from "./pages/LegalPrivacy";
import LegalPrivacy from "./pages/LegalPrivacy";
import LegalTerms from "./pages/LegalTerms";

const HomePage = lazy(() => import("./pages/HomePage"));
const Projects = lazy(() => import("./pages/projects/CorporateProjects"));
const Collections = lazy(() => import("./pages/HomePage"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Contact = lazy(() => import("./pages/Contact"));
const BookConsultation = lazy(() => import("./pages/Contact"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Legacy = lazy(() => import("./pages/HomePage"));
const CorporateProjects = lazy(
  () => import("./pages/projects/CorporateProjects"),
);
const Granite = lazy(() => import("./pages/products/Granit"));
const Sandstone = lazy(() => import("./pages/products/Sandstone"));
const Limestone = lazy(() => import("./pages/products/Limestone"));
const Quartz = lazy(() => import("./pages/products/Quartz"));
const Onyx = lazy(() => import("./pages/products/Onyx"));
const WoodenForring = lazy(() => import("./pages/products/WoodenForring"));
const Theromine = lazy(() => import("./pages/products/Thermopine"));
const IClad = lazy(() => import("./pages/products/ICLAD"));
const WPCPandelling = lazy(() => import("./pages/products/WPCpendeling"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-brand">
    <div className="flex flex-col items-center">
      {/* Logo */}
      <img
        src="https://res.cloudinary.com/x5rakscg/image/upload/v1785233735/logoTriveni_yu08nj.png"
        alt="Triveni"
        className="w-36 md:w-44 opacity-90"
      />

      {/* Elegant Loader */}
      <div className="mt-8 h-10 w-10 rounded-full border-2 border-brand border-t-accent animate-spin" />

      {/* Text */}
      <p className="mt-6 font-ui text-xs uppercase tracking-[0.35em] text-secondary">
        Preparing Your Experience
      </p>
    </div>
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-clip bg-[#fefefe]">
      <Navbar />
      <ScrollToTop />

      <main className="flex-1 w-full flex flex-col">
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<CorporateProjects />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-consultation" element={<BookConsultation />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/legacy" element={<Legacy />} />
              <Route path="/granite" element={<Granite />} />
              <Route path="/sandstone" element={<Sandstone />} />
              <Route path="/limestone" element={<Limestone />} />
              <Route path="/quartz" element={<Quartz />} />
              <Route path="/onyx" element={<Onyx />} />
              <Route path="/wooden-flooring" element={<WoodenForring />} />
              <Route path="/thermopine" element={<Theromine />} />
              <Route path="/i-clad" element={<IClad />} />
              <Route path="/wpc-panelling" element={<WPCPandelling />} />
              <Route path="/wpc-decking" element={<WpcDecking />} />
              <Route path="/dimore" element={<Dimore />} />
              <Route path="/ispira" element={<Ispira />} />
              <Route path="/arvia" element={<Arvia />} />
              <Route path="/marfil" element={<Marfil />} />
              <Route path="/monolith" element={<Monolith />} />
              <Route path="/marble-furniture" element={<MarbleFurniture />} />
              <Route path="/wash-basin" element={<WashBasin />} />
              <Route path="/bath-tub" element={<BathTub />} />
              <Route path="/wall-murals" element={<WallMurals />} />
              <Route path="/marble-artifacts" element={<MarbleArtifacts />} />
              <Route path="/marble-fountain" element={<MarbleFountain />} />
              <Route path="/privacy" element={<LegalPrivacy />} />
              <Route path="/legal-terms" element={<LegalTerms />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}

export default App;
