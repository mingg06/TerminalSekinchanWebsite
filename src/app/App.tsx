import "../styles/fonts.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollKinetics } from "./components/ScrollKinetics";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DiningPage } from "./pages/DiningPage";
import { EventsPage } from "./pages/EventsPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OfficialPage } from "./pages/OfficialPage";
import { TicketsPage } from "./pages/TicketsPage";

function ScrollToTop() {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        const target = document.querySelector(hash);

        if (target) {
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({
            block: "start",
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }, 0);

      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [hash, pathname, search]);

  return null;
}

function AppFooter() {
  const { pathname } = useLocation();

  if (pathname === "/official") {
    return null;
  }

  return <Footer />;
}

function AppScrollKinetics() {
  const { pathname } = useLocation();

  if (pathname === "/official") {
    return null;
  }

  return <ScrollKinetics />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <ScrollToTop />
        <Navbar />
        <AppScrollKinetics />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/official" element={<OfficialPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <AppFooter />
      </div>
    </BrowserRouter>
  );
}
