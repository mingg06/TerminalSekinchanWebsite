import { useEffect, useId, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence } from "motion/react";
import { NearbyAttractionsMap } from "../components/NearbyAttractionsMap";
import { PhotoColumns } from "../components/PhotoColumns";
import { ResilientImage } from "../components/ResilientImage";
import { experienceSlides, pagePhotoColumns, videoLinks } from "../data/siteContent";
import {
  MotionReveal,
  blurIn,
  fadeLeft,
  fadeRight,
  motion,
  scaleIn,
  useReducedMotion,
} from "../lib/motionPresets";

function findExperience(id: string) {
  return experienceSlides.find((slide) => slide.id === id);
}

const boeingExperience = findExperience("boeing-727") ?? experienceSlides[0];
const trainExperience = findExperience("paddy-field-train") ?? experienceSlides[1] ?? boeingExperience;
const diningExperience = findExperience("premium-outlet-cafe") ?? experienceSlides[2] ?? boeingExperience;
const rideCtaPhoto = pagePhotoColumns.tickets.find((photo) => photo.id === "ticket-train-platform") ?? {
  image: trainExperience.image,
  alt: trainExperience.title,
};

const experienceDetails = [
  {
    title: "Boeing 727 Landmark",
    eyebrow: "Photo Stop",
    description:
      "The aircraft is the main first-impression landmark, best for wide photos, family portraits, and arrival shots.",
    bestFor: "Landmark photos",
    href: "/about",
    ctaLabel: "About The Landmark",
    image: boeingExperience.image,
    imageAlt: boeingExperience.title,
  },
  {
    title: "Paddy Field Train Ride",
    eyebrow: "Ticketed Ride",
    description:
      "A slower scenic ride through the paddy-field setting, designed as the main bookable experience for visitors.",
    bestFor: "Families and groups",
    href: "/tickets",
    ctaLabel: "Buy Train Tickets",
    image: trainExperience.image,
    imageAlt: trainExperience.title,
  },
  {
    title: "Dining At Terminal Sekinchan",
    eyebrow: "Food Stop",
    description:
      "A relaxed restaurant stop for guests who want to plan food around the ride, photos, or group visit.",
    bestFor: "Meal breaks",
    href: "/dining",
    ctaLabel: "Reserve Dining",
    image: diningExperience.image,
    imageAlt: "Dining at Terminal Sekinchan",
  },
];

const visitPathSteps = [
  {
    step: "First",
    title: "Start with the Boeing 727",
    description: "Take the wide landmark photos while everyone is fresh and the group is together.",
  },
  {
    step: "Next",
    title: "Ride through the paddy-field setting",
    description: "Use your train ride ticket for the slow scenic loop and family-friendly photos.",
  },
  {
    step: "Finish",
    title: "Eat, rest, and pick your last photo stop",
    description: "Wrap the visit with dining, station photos, or a quick contact stop if you need help.",
  },
];

const EXPERIENCE_ROTATION_MS = 4600;

function ExperienceActivityShowcase({ titleId }: { titleId: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const reduceMotion = useReducedMotion();
  const isPaused = isHeld;
  const activeExperience = experienceDetails[activeIndex];
  const orderedExperiences = [
    (activeIndex + experienceDetails.length - 1) % experienceDetails.length,
    activeIndex,
    (activeIndex + 1) % experienceDetails.length,
  ].map((index) => ({ ...experienceDetails[index], originalIndex: index }));

  useEffect(() => {
    if (reduceMotion || isPaused || experienceDetails.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % experienceDetails.length);
    }, EXPERIENCE_ROTATION_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  return (
    <section className="page-section page-section--tight-top experience-showcase-section" aria-labelledby={titleId}>
      <div
        className="route-container experience-showcase"
        onMouseEnter={() => setIsHeld(true)}
        onMouseLeave={() => setIsHeld(false)}
        onFocusCapture={() => setIsHeld(true)}
        onBlurCapture={(event) => {
          const nextTarget = event.relatedTarget;

          if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
            setIsHeld(false);
          }
        }}
      >
        <MotionReveal className="experience-showcase__intro" variant={fadeLeft}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeExperience.title}
              className="experience-showcase__intro-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="route-eyebrow">{activeExperience.eyebrow}</p>
              <h2 id={titleId}>{activeExperience.title}</h2>
              <p>{activeExperience.description}</p>
              <p className="experience-showcase__best">Best for: {activeExperience.bestFor}</p>
              <Link to={activeExperience.href} className="secondary-button">
                {activeExperience.ctaLabel}
              </Link>
            </motion.div>
          </AnimatePresence>
        </MotionReveal>

        <MotionReveal className="experience-showcase__stage-shell" variant={fadeRight}>
          <div
            className="experience-showcase__stage"
            role="region"
            aria-label="Experience photos"
          >
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Featured photo: {activeExperience.title}.
            </p>

            {orderedExperiences.map((experience, slotIndex) => (
              <div
                className="experience-showcase__slot"
                data-active={slotIndex === 1 ? "true" : undefined}
                data-experience-index={experience.originalIndex}
                key={slotIndex}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.article
                    className="experience-showcase-card"
                    key={experience.title}
                    initial={reduceMotion ? false : { opacity: 0, x: slotIndex === 0 ? -28 : 28, scale: 0.985 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: slotIndex === 0 ? 22 : -22, scale: 0.985 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      type="button"
                      className="experience-showcase-card__link"
                      onClick={() => setActiveIndex(experience.originalIndex)}
                      aria-label={
                        slotIndex === 1
                          ? `${experience.title}, featured photo`
                          : `Show ${experience.title}`
                      }
                      aria-pressed={slotIndex === 1}
                    >
                      <ResilientImage
                        src={experience.image}
                        alt={experience.imageAlt}
                        className="experience-showcase-card__image"
                      />
                    </button>
                  </motion.article>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

export function ExperiencesPage() {
  const introTitleId = useId();
  const detailsTitleId = useId();

  return (
    <main className="page-shell">
      <section className="page-section route-intro" aria-labelledby={introTitleId}>
        <div className="route-container">
          <MotionReveal className="section-heading section-heading--compact" variant={blurIn}>
            <p className="route-eyebrow">Attractions</p>
            <h1 id={introTitleId}>Things to do with your ticket</h1>
            <p>
              See what your Terminal Sekinchan visit can include before you book:
              the Boeing 727 landmark, train ride, paddy-field views, dining, and
              easy family photo moments.
            </p>
          </MotionReveal>

          <MotionReveal className="hero-actions route-intro__actions" variant={fadeRight}>
            <Link to="/tickets" className="primary-button">
              Buy Tickets
            </Link>
            <a
              href={videoLinks.facebookReel}
              className="ghost-button contact-actions__dark"
              target="_blank"
              rel="noreferrer"
            >
              Watch Video
            </a>
          </MotionReveal>
        </div>
      </section>

      <ExperienceActivityShowcase titleId={detailsTitleId} />

      <section className="page-section page-section--soft" aria-labelledby="visit-path-title">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={blurIn}>
            <p className="route-eyebrow">Suggested Flow</p>
            <h2 id="visit-path-title">What to do first, next, and before you leave</h2>
            <p>
              A simple visit path helps guests understand what they are buying and how the day can feel.
            </p>
          </MotionReveal>

          <div className="feature-grid">
            {visitPathSteps.map((step) => (
              <article className="feature-card" key={step.step}>
                <span className="feature-card__icon" aria-hidden="true">
                  {step.step}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PhotoColumns
        eyebrow="Photo Columns"
        title="Scenes guests usually photograph"
        description="The experience is intentionally visual: aircraft details, train moments, and open field views."
        photos={pagePhotoColumns.experiences}
        variant="grid"
        hidePhotoCaptions
        soft
      />

      <NearbyAttractionsMap />

      <section className="page-section" aria-label="Buy tickets">
        <div className="route-container">
          <MotionReveal className="photo-cta" variant={scaleIn}>
            <ResilientImage className="photo-cta__image" src={rideCtaPhoto.image} alt={rideCtaPhoto.alt} />
            <div className="photo-cta__scrim" aria-hidden="true" />
            <div className="photo-cta__content">
              <h2 className="photo-cta__title">Ready for the ride?</h2>
              <Link to="/tickets" className="primary-button">
                Buy Tickets
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
