import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, Ticket, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { buttonHover, buttonTap, easings, motion, useReducedMotion } from "../lib/motionPresets";
import { navItems } from "../data/siteContent";
import { LogoMark } from "./LogoMark";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const primaryNavItems = navItems.filter((item) => item.href !== "/tickets");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <motion.nav
      aria-label="Primary navigation"
      initial={reduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: scrolled ? "rgba(255,248,237,0.78)" : "rgba(255,255,255,0.94)",
        boxShadow: scrolled ? "0 14px 42px rgba(22,91,51,0.12)" : "0 1px 0 rgba(22,91,51,0.08)",
        backdropFilter: scrolled ? "blur(18px) saturate(150%)" : "blur(10px) saturate(120%)",
      }}
      transition={{ duration: 0.3, ease: easings.apple }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1rem, 2vw, 2rem)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <Link to="/" aria-label="Terminal Sekinchan home" className="nav-focus-link nav-logo-link" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <LogoMark />
        </Link>

        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "clamp(0.85rem, 1.6vw, 2rem)" }}>
          {primaryNavItems.map((item) => (
            <motion.span
              key={item.href}
              className="nav-link-motion"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <NavLink
                to={item.href}
                className="nav-focus-link nav-text-link"
                style={({ isActive }) => ({
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: isActive ? "#0f2a1a" : "#165B33",
                  backgroundColor: isActive ? "rgba(250,204,21,0.18)" : "transparent",
                  textDecoration: "none",
                  borderRadius: 999,
                  paddingInline: "0.75rem",
                  marginInline: "-0.75rem",
                  minHeight: 40,
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "background-color 150ms ease-out, color 150ms ease-out",
                })}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#0f2a1a";
                  event.currentTarget.style.backgroundColor = "rgba(47,125,63,0.08)";
                }}
                onMouseLeave={(event) => {
                  if (!event.currentTarget.getAttribute("aria-current")) {
                    event.currentTarget.style.color = "#165B33";
                    event.currentTarget.style.backgroundColor = "transparent";
                  } else {
                    event.currentTarget.style.backgroundColor = "rgba(250,204,21,0.18)";
                  }
                }}
              >
                {item.label}
              </NavLink>
            </motion.span>
          ))}
          <motion.span
            className="nav-ticket-motion"
            whileHover={reduceMotion ? undefined : buttonHover}
            whileTap={reduceMotion ? undefined : buttonTap}
          >
            <Link
              to="/tickets"
              aria-label="Buy tickets"
              className="nav-focus-link nav-ticket-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#165B33",
                color: "#fff",
                padding: "0.5rem 1.2rem",
                borderRadius: 999,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "background 150ms ease-out",
                minHeight: 44,
              }}
            >
              <Ticket size={15} aria-hidden="true" /> Buy Tickets
            </Link>
          </motion.span>
        </div>

        <motion.button
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          type="button"
          style={{
            background: "rgba(22,91,51,0.08)",
            border: "1px solid rgba(22,91,51,0.16)",
            borderRadius: 999,
            cursor: "pointer",
            color: "#165B33",
            display: "none",
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="mobile-menu-btn"
          whileHover={reduceMotion ? undefined : { scale: 1.04, y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: easings.apple }}
            style={{
              background: "rgba(255,248,237,0.98)",
              borderTop: "1px solid rgba(22,91,51,0.1)",
              padding: "1rem 2rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className="nav-focus-link mobile-nav-link"
                onClick={() => setOpen(false)}
                style={({ isActive }) => ({
                  fontFamily: "Nunito Sans, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: isActive ? "#0f2a1a" : "#165B33",
                  backgroundColor: isActive ? "rgba(250,204,21,0.18)" : "transparent",
                  textDecoration: "none",
                  borderRadius: 8,
                  paddingInline: "0.8rem",
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                })}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/tickets"
              onClick={() => setOpen(false)}
              aria-label="Buy tickets"
              className="nav-focus-link nav-ticket-link mobile-ticket-link"
              style={{
                background: "#165B33",
                color: "#fff",
                padding: "0.7rem 1.5rem",
                borderRadius: 999,
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Buy Tickets
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-focus-link:focus-visible,
        .mobile-menu-btn:focus-visible {
          outline: 3px solid #f5b823;
          outline-offset: 4px;
        }
        .nav-text-link:focus-visible,
        .mobile-nav-link:focus-visible {
          color: #0f2a1a !important;
        }
        .nav-ticket-link:focus-visible {
          background: #0f3f25 !important;
          transform: translateY(-1px);
        }
        .nav-logo-link:focus-visible {
          border-radius: 4px;
        }
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          #mobile-navigation { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
