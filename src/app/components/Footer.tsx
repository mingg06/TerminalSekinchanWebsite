import { Link } from "react-router";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { MotionReveal, StaggerGroup, StaggerItem, buttonTap, motion, useReducedMotion } from "../lib/motionPresets";
import { contactDetails, navItems, socialLinks } from "../data/siteContent";
import { LogoMark } from "./LogoMark";

export function Footer({ reveal = true }: { reveal?: boolean }) {
  const routeLinks = navItems.filter((item) => item.href.startsWith("/"));
  const reduceMotion = useReducedMotion();

  const footer = (
    <footer className={reveal ? undefined : "site-footer--static"} style={{ background: "#0f2a1a", color: "#fdf8f0", padding: "4rem 0 2rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <StaggerGroup style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          <StaggerItem>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <Link to="/" aria-label="Terminal Sekinchan home" className="footer-focus-link footer-logo-link" style={{ display: "inline-flex", textDecoration: "none" }}>
                <LogoMark />
              </Link>
            </div>
            <p style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.9rem", color: "rgba(253,248,240,0.6)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 280 }}>
              Terminal Sekinchan brings aircraft photo moments, train rides, dining, and family-friendly stops together in Sekinchan.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="footer-focus-link footer-social-link"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(253,248,240,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(253,248,240,0.7)",
                    transition: "background 0.2s",
                    textDecoration: "none",
                  }}
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.08, backgroundColor: "rgba(245,184,35,0.2)" }}
                  whileTap={reduceMotion ? undefined : buttonTap}
                >
                  <Icon size={16} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
          </StaggerItem>

          <StaggerItem>
          <div>
            <h4 style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "0.95rem", color: "#fdf8f0", marginBottom: "1rem" }}>Explore</h4>
            {routeLinks.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="footer-focus-link footer-text-link"
                style={{ display: "block", fontFamily: "Nunito Sans, sans-serif", fontSize: "0.88rem", color: "rgba(253,248,240,0.6)", textDecoration: "none", marginBottom: "0.5rem", transition: "color 150ms ease-out" }}
                onMouseEnter={(event) => (event.currentTarget.style.color = "#f5b823")}
                onMouseLeave={(event) => (event.currentTarget.style.color = "rgba(253,248,240,0.6)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
          </StaggerItem>

          <StaggerItem>
          <div>
            <h4 style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "0.95rem", color: "#fdf8f0", marginBottom: "1rem" }}>Visit</h4>
            {routeLinks.slice(4).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="footer-focus-link footer-text-link"
                style={{ display: "block", fontFamily: "Nunito Sans, sans-serif", fontSize: "0.88rem", color: "rgba(253,248,240,0.6)", textDecoration: "none", marginBottom: "0.5rem", transition: "color 150ms ease-out" }}
                onMouseEnter={(event) => (event.currentTarget.style.color = "#f5b823")}
                onMouseLeave={(event) => (event.currentTarget.style.color = "rgba(253,248,240,0.6)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
          </StaggerItem>

          <StaggerItem>
          <div>
            <h4 style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "0.95rem", color: "#fdf8f0", marginBottom: "1rem" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                { icon: MapPin, text: contactDetails.address, href: contactDetails.mapUrl, label: "Open Terminal Sekinchan in maps" },
                { icon: Phone, text: contactDetails.phone, href: `tel:${contactDetails.phone.replace(/\D/g, "")}`, label: `Call ${contactDetails.phone}` },
                { icon: MessageCircle, text: "WhatsApp", href: contactDetails.whatsappUrl, label: "Message Terminal Sekinchan on WhatsApp" },
                { icon: Clock, text: contactDetails.openingHours },
              ].map(({ icon: Icon, text, href, label }) => (
                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <Icon size={14} color="#f5b823" style={{ marginTop: 3, flexShrink: 0 }} aria-hidden="true" />
                  {href ? (
                    <a
                      href={href}
                      aria-label={label}
                      className="footer-focus-link footer-text-link"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.85rem", color: "rgba(253,248,240,0.6)", lineHeight: 1.5, textDecoration: "none" }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.85rem", color: "rgba(253,248,240,0.6)", lineHeight: 1.5 }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          </StaggerItem>
        </StaggerGroup>

        <div style={{ borderTop: "1px solid rgba(253,248,240,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.82rem", color: "rgba(253,248,240,0.4)" }}>
            (c) 2026 Terminal Sekinchan. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {routeLinks.slice(0, 3).map((item) => (
              <Link key={item.href} to={item.href} className="footer-focus-link footer-text-link" style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.82rem", color: "rgba(253,248,240,0.4)", textDecoration: "none" }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .footer-focus-link:focus-visible {
          outline: 3px solid #f5b823;
          outline-offset: 4px;
          border-radius: 4px;
        }
        .footer-text-link:focus-visible {
          color: #f5b823 !important;
        }
        .footer-social-link:focus-visible {
          background: rgba(245,184,35,0.2) !important;
          color: #fdf8f0 !important;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );

  return reveal ? <MotionReveal>{footer}</MotionReveal> : footer;
}
