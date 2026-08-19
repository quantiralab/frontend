import { Facebook, Linkedin, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

const XIcon = ({ className, title }: { className?: string; title?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label={title}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const links = {
  Product: ["Features", "Pricing", "About", "Contact"],
  Legal: ["Privacy", "Terms"],
};

const socials = [
  { Icon: XIcon, href: "https://x.com/QuantiraLab", label: "X" },
  { Icon: Facebook, href: "https://www.facebook.com/QuantiraLab0", label: "Facebook" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/quantira-ai-lab/", label: "Linkedin" },
  { Icon: Youtube, href: "https://www.youtube.com/@QuantiraLab", label: "Youtube" },
];

const linkHrefs: Record<string, Record<string, string>> = {
  Product: {
    "Features": "/#features",
    "Pricing": "/#pricing",
    "About": "/about",
    "Contact": "/#contact",
  },
  Legal: {
    "Privacy": "/privacy",
    "Terms": "/terms",
  },
};

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      window.location.href = href;
    } else {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <footer className="border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-80">
          <div className="lg:col-span-2">
            <img src="/images/Logo.svg" alt="KnoViz Logo" className="w-36 h-36" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
              Transforming complex data into interactive visual maps that make insights clear, connected, and actionable.
            </p>
            <div className="flex gap-4">
              {socials.map(({ Icon, href, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-primary/10 transition-colors hover:shadow-[0_0_15px_rgba(10,186,181,0.2)]">
                  <Icon className="w-4 h-4" title={label} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="font-display font-semibold text-sm mb-3">{title}</p>
              <ul className="space-y-2">
                {items.map((item) => {
                  const href = linkHrefs[title]?.[item] || "#";
                  return (
                    <li key={item}>
                      <a
                        href={href}
                        onClick={handleLinkClick(href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="neon-line mt-12 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2026 Quantira AI Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
