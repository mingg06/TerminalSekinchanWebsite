import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { buttonHover, buttonTap, motion, useReducedMotion } from "../lib/motionPresets";
import { ResilientImage } from "./ResilientImage";

export type ExperienceSlideshowSlide = {
  id: string;
  title: string;
  eyebrow?: string;
  description: string;
  image: string;
  imageAlt?: string;
  href: string;
  icon?: LucideIcon;
};

export type ExperienceSlideshowProps = {
  slides: ExperienceSlideshowSlide[];
};

const MotionResilientImage = motion.create(ResilientImage);
const AUTO_ADVANCE_MS = 5200;

export function ExperienceSlideshow({ slides }: ExperienceSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeSlide = slides[activeIndex];
  const ActiveIcon = activeSlide?.icon;

  const totalLabel = useMemo(() => slides.length.toString().padStart(2, "0"), [slides.length]);

  if (!activeSlide) {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    if (reduceMotion || isPaused || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion, slides.length]);

  return (
    <section
      className="experience-slideshow"
      aria-label="Terminal Sekinchan experience slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {slides.length}: {activeSlide.title}
      </p>

      <Link
        to={activeSlide.href}
        className="experience-slideshow__viewport experience-slideshow__link"
        aria-label={`View ${activeSlide.title}`}
      >
        <AnimatePresence mode="wait">
          <MotionResilientImage
            key={activeSlide.id}
            className="experience-slideshow__image"
            src={activeSlide.image}
            alt={activeSlide.imageAlt || activeSlide.title}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.08, clipPath: "inset(8% 0% 8% 0%)" }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        <div className="experience-slideshow__overlay">
          <motion.div
            key={`${activeSlide.id}-copy`}
            className="experience-slideshow__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {(activeSlide.eyebrow || ActiveIcon) ? (
              <div className="experience-slideshow__meta">
                {ActiveIcon ? (
                  <span className="experience-slideshow__icon" aria-hidden="true">
                    <ActiveIcon size={17} strokeWidth={2.4} />
                  </span>
                ) : null}
                {activeSlide.eyebrow ? (
                  <p className="route-eyebrow">{activeSlide.eyebrow}</p>
                ) : null}
              </div>
            ) : null}
            <h2>{activeSlide.title}</h2>
            <p>{activeSlide.description}</p>
            <span className="experience-slideshow__cta" aria-hidden="true">
              View Details
            </span>
          </motion.div>

          <motion.div
            className="experience-slideshow__count"
            aria-hidden="true"
            key={`${activeSlide.id}-count`}
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{totalLabel}</span>
          </motion.div>
        </div>
      </Link>

      <div className="experience-slideshow__controls">
        <motion.button
          type="button"
          className="experience-slideshow__arrow"
          onClick={goToPrevious}
          aria-label="Show previous experience"
          whileHover={reduceMotion ? undefined : buttonHover}
          whileTap={reduceMotion ? undefined : buttonTap}
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </motion.button>

        <div className="experience-slideshow__dots" aria-label="Choose experience">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              type="button"
              className="experience-slideshow__dot"
              data-active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              whileHover={reduceMotion ? undefined : { scale: 1.08 }}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            >
              <span className="experience-slideshow__dot-marker" aria-hidden="true" />
            </motion.button>
          ))}
        </div>

        <motion.button
          type="button"
          className="experience-slideshow__arrow"
          onClick={goToNext}
          aria-label="Show next experience"
          whileHover={reduceMotion ? undefined : buttonHover}
          whileTap={reduceMotion ? undefined : buttonTap}
        >
          <ChevronRight size={22} aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
}
