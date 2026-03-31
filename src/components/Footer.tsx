import { Map, Twitter, Github, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const links = {
  Product: ["Features", "Pricing", "About", "Contact"],
  Legal: ["Privacy", "Terms"],
};

const socials = [Twitter, Github, Linkedin, Youtube];

const linkHrefs: Record<string, Record<string, string>> = {
  Product: {
    "Features": "#features",
    "Pricing": "#pricing",
    "About": "#about",
    "Contact": "#contact",
  },
  Legal: {
    "Privacy": "/privacy",
    "Terms": "/terms",
    
  },

};

const Footer = () => (
  <footer className="border-t border-border/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-80">
        <div className="lg:col-span-2">
      <a href="#" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(10,186,181,0.4)]">
              <Map className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">KnoViz</span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
            Transforming complex data into interactive visual maps that make insights clear, connected, and actionable.
          </p>
          <div className="flex gap-4">
            {socials.map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-primary/10 transition-colors hover:shadow-[0_0_15px_rgba(10,186,181,0.2)]">
                <Icon className="w-4 h-4" />
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
                const isRoute = href.startsWith("/");
                
                return (
                  <li key={item}>
                    {isRoute ? (
                      <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                    ) : (
                      <a href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="neon-line mt-12 mb-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 KnoViz. All rights reserved.</p>
        {/* <p className="text-xs text-muted-foreground">Made with ❤️ for curious minds</p> */}
      </div>
    </div>
  </footer>
);

export default Footer;
