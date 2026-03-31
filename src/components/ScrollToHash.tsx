import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAX_SCROLL_ATTEMPTS = 10;
const SCROLL_RETRY_DELAY = 80;

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timeoutId: number | undefined;

    const scrollToSection = () => {
      const section = document.getElementById(targetId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      if (attempts < MAX_SCROLL_ATTEMPTS) {
        attempts += 1;
        timeoutId = window.setTimeout(scrollToSection, SCROLL_RETRY_DELAY);
      }
    };

    scrollToSection();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
