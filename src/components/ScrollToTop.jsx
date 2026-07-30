import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    const frame = window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
