import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, MapPin, Ticket } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion, useReducedMotion } from "../lib/motionPresets";
import terminalSekinchanHeroGenerated from "../../assets/terminal-sekinchan-hero-generated.png";
import terminalSekinchanPlaneCloseup from "../../assets/terminal-sekinchan-plane-closeup.png";
import terminalSekinchanStationWide from "../../assets/terminal-sekinchan-station-wide.png";
import terminalTrainStation from "../../assets/terminal-train-station.png";

export type PhotoHeroAction = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type PhotoHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  videoLink?: string;
  primaryAction?: PhotoHeroAction;
  secondaryActions?: PhotoHeroAction[];
};

type HeroSlide = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const AUTO_PLAY_MS = 6000;

const heroSlides: HeroSlide[] = [
  {
    id: "boeing-landmark",
    category: "Signature Landmark",
    title: "Terminal Sekinchan",
    description:
      "Step into Sekinchan's aircraft landmark, where the Boeing 727 becomes the first photo stop beside the paddy fields.",
    image: terminalSekinchanPlaneCloseup,
    alt: "Terminal Sekinchan aircraft landmark with colourful Visit Selangor artwork",
  },
  {
    id: "paddy-fields",
    category: "Sekinchan Countryside",
    title: "Green Fields, Open Sky",
    description:
      "Frame the aircraft against Sekinchan's paddy-field landscape, with wide views made for slow family walks and photos.",
    image: terminalSekinchanHeroGenerated,
    alt: "Terminal Sekinchan aircraft landmark surrounded by green paddy fields",
  },
  {
    id: "station-fields",
    category: "Paddy Field Station",
    title: "Ride Through The Fields",
    description:
      "Slow down at the countryside station and follow the mini train setting through wide green rice-field scenery.",
    image: terminalSekinchanStationWide,
    alt: "Terminal Sekinchan train station beside green paddy fields",
  },
  {
    id: "train-moment",
    category: "Mini Train Ride",
    title: "Stay For The Ride",
    description:
      "Book the train, linger for the field views, and make the aircraft landmark part of a complete Sekinchan route.",
    image: terminalTrainStation,
    alt: "Mini train station experience at Terminal Sekinchan",
  },
];

function isAppRoute(href: string) {
  return href.startsWith("/");
}

function isSamePageAnchor(href: string) {
  return href.startsWith("#");
}

function HeroActionLink({
  action,
  className,
  icon,
}: {
  action: PhotoHeroAction;
  className: string;
  icon?: "ticket" | "map";
}) {
  const Icon = icon === "ticket" ? Ticket : icon === "map" ? MapPin : null;
  const content = (
    <>
      {Icon ? <Icon size={18} aria-hidden="true" /> : null}
      {action.label}
    </>
  );

  if (isAppRoute(action.href)) {
    return (
      <Link to={action.href} className={className} aria-label={action.ariaLabel}>
        {content}
      </Link>
    );
  }

  if (isSamePageAnchor(action.href)) {
    return (
      <a href={action.href} className={className} aria-label={action.ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <a
      href={action.href}
      className={className}
      aria-label={action.ariaLabel}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  );
}

export function PhotoHero({
  primaryAction,
  secondaryActions = [],
}: PhotoHeroProps) {
  const titleId = useId();
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const activeSlide = heroSlides[selectedIndex] ?? heroSlides[0];
  const nextSlide = heroSlides[(selectedIndex + 1) % heroSlides.length];

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaApi]
  );

  const scrollPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    );

    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    setSelectedIndex((current) =>
      current === heroSlides.length - 1 ? 0 : current + 1
    );

    emblaApi?.scrollNext();
  }, [emblaApi]);

  const secondaryAction = secondaryActions[0];
  const slideLabel = useMemo(
    () => `${selectedIndex + 1} of ${heroSlides.length}`,
    [selectedIndex]
  );

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const handleSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    handleSelect();
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (reduceMotion || isPaused || heroSlides.length <= 1) {
      return;
    }

    const timer = window.setInterval(scrollNext, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion, scrollNext, selectedIndex]);

  useEffect(() => {
    if (!nextSlide) {
      return;
    }

    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = nextSlide.image;
    document.head.appendChild(preload);

    return () => {
      preload.remove();
    };
  }, [nextSlide]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  }

  return (
    <section
      className="photo-hero photo-hero--carousel"
      aria-labelledby={titleId}
      aria-roledescription="carousel"
      aria-label="Terminal Sekinchan hero slideshow"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;

        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="photo-hero__background" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeSlide.id}
            className="photo-hero__background-image"
            src={activeSlide.image}
            alt=""
            loading={selectedIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1.08 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.08 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
      </div>

      <div className="photo-hero__swipe-viewport" ref={emblaRef} aria-hidden="true">
        <div className="photo-hero__swipe-track">
          {heroSlides.map((slide) => (
            <div className="photo-hero__swipe-slide" key={slide.id} />
          ))}
        </div>
      </div>

      <div className="photo-hero__shade" aria-hidden="true" />

      <button
        type="button"
        className="photo-hero__nav photo-hero__nav--previous"
        onClick={scrollPrevious}
        aria-label="Show previous hero slide"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="photo-hero__nav photo-hero__nav--next"
        onClick={scrollNext}
        aria-label="Show next hero slide"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>

      <div className="photo-hero__inner">
        <div className="photo-hero__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              className="photo-hero__copy-motion"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="photo-hero__category"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeSlide.category}
              </motion.p>
              <motion.h1
                id={titleId}
                initial={reduceMotion ? false : { opacity: 0, y: 26, filter: "blur(12px)" }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeSlide.title}
              </motion.h1>
              <motion.p
                className="photo-hero__description"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeSlide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {(primaryAction || secondaryAction) && (
            <div className="hero-actions photo-hero__actions" aria-label="Hero actions">
              {primaryAction ? (
                <motion.span
                  className="hero-action-motion"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  <HeroActionLink action={primaryAction} className="primary-button" icon="ticket" />
                </motion.span>
              ) : null}
              {secondaryAction ? (
                <motion.span
                  className="hero-action-motion"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <HeroActionLink action={secondaryAction} className="secondary-button" icon="map" />
                </motion.span>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="photo-hero__bottom">
        <div className="photo-hero__status" aria-hidden="true">
          <span>{String(selectedIndex + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(heroSlides.length).padStart(2, "0")}</span>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Hero slide {slideLabel}: {activeSlide.title}
        </p>
      </div>
    </section>
  );
}
