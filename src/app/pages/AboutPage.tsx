import { Link } from "react-router";
import { CalendarDays, ExternalLink, MapPin, Plane, Sprout, Users, Utensils } from "lucide-react";
import { ResilientImage } from "../components/ResilientImage";
import { experienceSlides } from "../data/siteContent";
import {
  MotionReveal,
  StaggerGroup,
  StaggerItem,
  blurIn,
  fadeLeft,
  fadeRight,
} from "../lib/motionPresets";

const boeingExperience =
  experienceSlides.find((slide) => slide.id === "boeing-727") ?? experienceSlides[0];

const storyImage = {
  image: boeingExperience.image,
  alt: "Boeing 727 aircraft standing beside Sekinchan paddy fields",
  label: "A plane in the paddy fields",
};

const storyPoints = [
  {
    id: "landmark",
    title: "A Boeing landmark",
    description: "Online tourism references consistently describe the aircraft as Terminal Sekinchan's main photo landmark.",
    icon: Plane,
  },
  {
    id: "tourism",
    title: "Part of the paddy-field route",
    description: "The attraction sits around Ban 3, Jalan Parit 5, close to Sekinchan's open rice-field scenery.",
    icon: MapPin,
  },
  {
    id: "families",
    title: "Made for casual visits",
    description: "Listings and public posts frame it as an easy family stop for photos, rides, and group outings.",
    icon: Users,
  },
  {
    id: "dining",
    title: "Food and event stop",
    description: "Recent online event listings also connect the place with festivals, runs, food stalls, and public programmes.",
    icon: Utensils,
  },
];

const storyChapters = [
  {
    id: "fields",
    eyebrow: "The Setting",
    title: "Sekinchan first, attraction second",
    description:
      "Terminal Sekinchan works because it sits inside the landscape people already come to Sekinchan for: flat paddy fields, open sky, village roads, and a slower countryside pace. The plane is the landmark, but the fields are the atmosphere around it.",
    icon: Sprout,
  },
  {
    id: "plane",
    eyebrow: "The Landmark",
    title: "A Boeing 727 turned into a memory point",
    description:
      "Most places in a rice-field town are quiet and practical. Placing a Boeing 727 there makes the stop instantly recognizable. It gives families, school groups, and tourists a simple story to bring home: they saw an aircraft sitting beside the paddy.",
    icon: Plane,
  },
  {
    id: "families",
    eyebrow: "The Visit",
    title: "Built around simple family moments",
    description:
      "The experience is not complicated. Visitors come for photos, a short ride, food, and a place to gather before continuing around Sekinchan. That simplicity is part of the appeal: it feels easy to understand, easy to plan, and easy to share.",
    icon: Users,
  },
  {
    id: "events",
    eyebrow: "Public Moments",
    title: "From a photo stop to a community stage",
    description:
      "Recent festival, tourism, and running-event coverage shows Terminal Sekinchan being used as more than a backdrop. It has become a practical gathering point for local programmes that connect agriculture, food, tourism, and families.",
    icon: CalendarDays,
  },
];

const internetNotes = [
  {
    id: "official",
    title: "Official site basics",
    description:
      "The official site lists Terminal Sekinchan at Ban 3, Jalan Parit 5, Sekinchan, with daily opening hours from 9:00 AM to 8:00 PM.",
    href: "https://terminalsekinchan.com/",
    source: "terminalsekinchan.com",
  },
  {
    id: "visit-sekinchan",
    title: "Tourism listing",
    description:
      "Visit Sekinchan presents the attraction as a Boeing 727 landmark set among paddy fields, with photo-taking as a main reason to stop.",
    href: "https://www.visit-sekinchan.com/attractions.html",
    source: "Visit Sekinchan",
  },
  {
    id: "media-selangor",
    title: "Festival coverage",
    description:
      "Media Selangor reported Festival Sawah Padi Sekinchan 2025 activity connected to Terminal Sekinchan and Selangor tourism programming.",
    href: "https://mediaselangor.com/ms/2025/04/262338/sasar-13000-pengunjung-meriahkan-festival-sawah-padi-sekinchan-2025",
    source: "Media Selangor",
  },
  {
    id: "the-star",
    title: "Tourism context",
    description:
      "The Star covered Selangor tourism momentum and mentioned Festival Sawah Padi programming connected with Terminal Sekinchan.",
    href: "https://www.thestar.com.my/metro/metro-news/2025/06/07/surge-in-foreign-tourists-visiting-sgor-in-lead-up-to-vsy-2025",
    source: "The Star",
  },
];

export function AboutPage() {
  return (
    <main className="page-shell about-page">
      <section className="page-section route-intro about-story" aria-labelledby="about-story-title">
        <div className="route-container about-story__layout">
          <MotionReveal className="about-story__copy" variant={fadeLeft}>
            <p className="route-eyebrow">About</p>
            <h1 id="about-story-title">Terminal Sekinchan</h1>
            <p>
              Terminal Sekinchan is a countryside visitor stop in Sekinchan, Selangor,
              known online for its Boeing 727 landmark, paddy-field views, rides,
              dining, and public tourism events.
            </p>
            <div className="hero-actions route-intro__actions">
              <Link to="/tickets" className="primary-button">
                Buy Tickets
              </Link>
              <Link to="/experiences" className="secondary-button">
                Explore Experiences
              </Link>
              <Link to="/contact" className="ghost-button contact-actions__dark">
                Contact
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal className="about-story-panel" variant={fadeRight}>
            <figure className="about-story-panel__image">
              <ResilientImage src={storyImage.image} alt={storyImage.alt} />
              <figcaption>{storyImage.label}</figcaption>
            </figure>
            <div className="about-story-panel__copy">
              <p className="route-eyebrow">Story</p>
              <h2>A countryside stop with one unusual landmark</h2>
              <p>
                The charm is the contrast: a retired aircraft beside working rice-field scenery.
                That mix makes Terminal Sekinchan feel different from a standard attraction.
              </p>
              <dl>
                <div>
                  <dt>Place</dt>
                  <dd>Ban 3, Jalan Parit 5</dd>
                </div>
                <div>
                  <dt>Known for</dt>
                  <dd>Boeing 727 and paddy-field views</dd>
                </div>
              </dl>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="page-section about-chapters-section" aria-labelledby="about-chapters-title">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={blurIn}>
            <p className="route-eyebrow">The Story</p>
            <h2 id="about-chapters-title">Why people remember this place</h2>
            <p>
              Terminal Sekinchan is easier to understand as a series of small stories:
              the fields, the plane, the family visit, and the public events around it.
            </p>
          </MotionReveal>

          <StaggerGroup className="about-chapter-list">
            {storyChapters.map((chapter, index) => {
              const Icon = chapter.icon;

              return (
                <StaggerItem key={chapter.id} index={index}>
                  <article className="about-chapter">
                    <span className="about-chapter__icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={2.4} />
                    </span>
                    <div>
                      <p className="route-eyebrow">{chapter.eyebrow}</p>
                      <h3>{chapter.title}</h3>
                      <p>{chapter.description}</p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="page-section page-section--soft" aria-labelledby="about-landmark-title">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={blurIn}>
            <p className="route-eyebrow">Internet Notes</p>
            <h2 id="about-landmark-title">What shows up about Terminal Sekinchan</h2>
          </MotionReveal>

          <StaggerGroup className="feature-grid">
            {storyPoints.map((point, index) => {
              const Icon = point.icon;

              return (
                <StaggerItem key={point.id} index={index} asCard>
                  <article className="feature-card">
                    <span className="feature-card__icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={2.4} />
                    </span>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="page-section about-research-section" aria-labelledby="about-research-title">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={fadeLeft}>
            <p className="route-eyebrow">Sources</p>
            <h2 id="about-research-title">Plain research notes</h2>
            <p>
              A few simple source-backed notes gathered from the official site,
              tourism listings, and local coverage.
            </p>
          </MotionReveal>

          <StaggerGroup className="about-research-grid">
            {internetNotes.map((note, index) => (
              <StaggerItem key={note.id} index={index} asCard>
                <article className="about-research-card">
                  <p className="route-eyebrow">{note.source}</p>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                  <a href={note.href} target="_blank" rel="noreferrer">
                    Open Source
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="page-section page-section--soft" aria-label="Buy tickets after about">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={blurIn}>
            <p className="route-eyebrow">Next Step</p>
            <h2>Ready to see the landmark in person?</h2>
            <p>
              Book the train ride ticket, then plan photos, dining, and the rest of your Sekinchan stop around it.
            </p>
            <div className="hero-actions route-intro__actions">
              <Link to="/tickets" className="primary-button">
                Buy Tickets
              </Link>
              <Link to="/contact" className="secondary-button">
                Plan Your Visit
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>

    </main>
  );
}
