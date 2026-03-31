import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CookiesBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookies-accepted");
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookies-accepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-card border border-border/50 rounded-lg shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-300">
        <div className="relative px-6 py-4 sm:py-5">
          {/* Close Button */}
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pr-8 sm:pr-10">
            <h3 className="font-display font-semibold text-sm mb-2">Cookie Preferences</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept", you consent to our use of cookies. You can manage your preferences at any time.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-[0_0_15px_rgba(10,186,181,0.4)] transition-all duration-200 flex items-center justify-center"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;
