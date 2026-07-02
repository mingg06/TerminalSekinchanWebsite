import { useEffect, useRef, useState } from "react";
import { ArrowUp, Plane } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

const IDLE_TIMEOUT_MS = 650;
const journeyStops = ["Arrival", "Discover", "Experience", "Plan", "Visit"];

function getJourneyStop(progress: number) {
  const index = Math.min(
    journeyStops.length - 1,
    Math.floor(progress * journeyStops.length)
  );

  return journeyStops[index];
}

export function ScrollKinetics() {
  const reduceMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.18,
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [progressLabel, setProgressLabel] = useState(0);
  const [journeyLabel, setJourneyLabel] = useState(journeyStops[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsScrolling(true);
    setProgressLabel(Math.round(latest * 100));
    setJourneyLabel(getJourneyStop(latest));

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, IDLE_TIMEOUT_MS);
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;

    if (Math.abs(latest - previous) > 2) {
      setScrollDirection(latest > previous ? "down" : "up");
    }
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (reduceMotion) {
    return null;
  }

  const showJourney = progressLabel > 2;

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <motion.span className="scroll-progress__bar" style={{ scaleX: progress }} />
      </div>

      <motion.div
        className="scroll-journey"
        data-direction={scrollDirection}
        initial={false}
        animate={{
          opacity: showJourney ? 1 : 0,
          y: showJourney ? 0 : 14,
          scale: isScrolling ? 1 : 0.98,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden={!showJourney}
      >
        <span className="scroll-journey__icon" aria-hidden="true">
          <Plane size={16} strokeWidth={2.4} />
        </span>
        <span className="scroll-journey__copy">
          <strong>{journeyLabel}</strong>
          <span>{progressLabel}%</span>
        </span>
        <button
          type="button"
          className="scroll-journey__top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <ArrowUp size={15} strokeWidth={2.6} aria-hidden="true" />
        </button>
      </motion.div>
    </>
  );
}
