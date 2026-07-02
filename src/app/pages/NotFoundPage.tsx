import { Link } from "react-router";
import { Home, MapPin, Ticket } from "lucide-react";
import { contactDetails } from "../data/siteContent";
import { MotionReveal, blurIn, fadeRight } from "../lib/motionPresets";

export function NotFoundPage() {
  return (
    <main className="page-shell not-found-page">
      <section className="page-section route-intro not-found" aria-labelledby="not-found-title">
        <div className="route-container">
          <MotionReveal className="section-heading section-heading--compact" variant={blurIn}>
            <p className="route-eyebrow">404</p>
            <h1 id="not-found-title">Page Not Found</h1>
            <p>
              This page may have moved. Head back to Terminal Sekinchan planning, tickets, or
              directions.
            </p>
          </MotionReveal>

          <MotionReveal className="hero-actions route-intro__actions" variant={fadeRight}>
            <Link to="/" className="primary-button">
              <Home size={18} aria-hidden="true" />
              Go Home
            </Link>
            <Link to="/tickets" className="secondary-button">
              <Ticket size={18} aria-hidden="true" />
              View Tickets
            </Link>
            <a className="ghost-button contact-actions__dark" href={contactDetails.mapUrl} target="_blank" rel="noreferrer">
              <MapPin size={18} aria-hidden="true" />
              Get Directions
            </a>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
