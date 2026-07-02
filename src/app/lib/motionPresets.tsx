import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";

export const TIMING = {
  heroHeadline: 0.8,
  heroDescription: 0.8,
  heroButton: 0.55,
  section: 0.65,
  card: 0.55,
  mask: 0.7,
  hover: 0.18,
  press: 0.1,
};

export const easings = {
  apple: [0.16, 1, 0.3, 1],
  soft: [0.33, 1, 0.68, 1],
} as const;

export const viewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -10% 0px",
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.section, ease: easings.apple },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.section, ease: easings.apple },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -34 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.section, ease: easings.apple },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 34 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.section, ease: easings.apple },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMING.card, ease: easings.apple },
  },
};

export const blurIn = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: TIMING.section, ease: easings.apple },
  },
};

export const heroHeadline = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: TIMING.heroHeadline, ease: easings.apple },
  },
};

export const heroDescription = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: TIMING.heroDescription, delay: 0.2, ease: easings.apple },
  },
};

export const heroButtonItem = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TIMING.heroButton,
      delay: 0.32 + index * 0.08,
      ease: easings.apple,
    },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: TIMING.card, ease: easings.apple },
  },
};

export const revealMask = {
  hidden: { opacity: 0, clipPath: "inset(12% 0% 12% 0% round 8px)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    transition: { duration: TIMING.mask, ease: easings.apple },
  },
};

export const parallax = {
  y: [-18, 18],
  transition: {
    duration: 8,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "mirror" as const,
  },
};

export const buttonHover = {
  y: -3,
  scale: 1.03,
  boxShadow: "0 16px 34px rgba(15, 42, 26, 0.18)",
  transition: { duration: TIMING.hover, ease: easings.soft },
};

export const buttonTap = {
  y: 0,
  scale: 0.97,
  transition: { duration: TIMING.press, ease: easings.soft },
};

export const cardHover = {
  y: -7,
  scale: 1.03,
  boxShadow: "0 24px 58px rgba(15, 42, 26, 0.16)",
  transition: { duration: TIMING.hover, ease: easings.soft },
};

type RevealProps = Omit<ComponentPropsWithoutRef<typeof motion.div>, "variants"> & {
  children: ReactNode;
  delay?: number;
  variant?: typeof fadeUp;
  amount?: number;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  variant = fadeUp,
  style,
  amount,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const visible = reduceMotion ? "visible" : undefined;

  return (
    <motion.div
      className={className}
      initial={visible ?? "hidden"}
      whileInView="visible"
      viewport={{ ...viewport, amount: amount ?? viewport.amount }}
      variants={variant}
      transition={delay ? { delay } : undefined}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerGroupProps = ComponentPropsWithoutRef<typeof motion.div> & {
  amount?: number;
};

export const StaggerGroup = forwardRef<HTMLDivElement, StaggerGroupProps>(function StaggerGroup(
  { children, className, style, amount, ...props },
  ref
) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ ...viewport, amount: amount ?? viewport.amount }}
      variants={staggerContainer}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export function StaggerItem({
  children,
  className,
  index = 0,
  asCard = false,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  asCard?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={staggerItem}
      custom={index}
      whileHover={reduceMotion || !asCard ? undefined : cardHover}
      whileTap={reduceMotion || !asCard ? undefined : { scale: 0.99 }}
    >
      {children}
    </motion.div>
  );
}

type MotionLinkProps = ComponentPropsWithoutRef<typeof motion.a> & {
  children: ReactNode;
};

export function MotionAnchor({ children, ...props }: MotionLinkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      whileHover={reduceMotion ? undefined : buttonHover}
      whileTap={reduceMotion ? undefined : buttonTap}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function AnimatedNumber({
  value,
  className,
  delay = 0,
}: {
  value: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const match = value.match(/^([\d,.]+)(.*)$/);
  const target = Number.parseFloat((match?.[1] ?? "0").replace(/,/g, ""));
  const suffix = match?.[2] ?? "";
  const decimals = match?.[1]?.includes(".") ? 1 : 0;
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : `0${suffix}`);

  useEffect(() => {
    if (!isInView || reduceMotion) {
      if (reduceMotion) {
        setDisplayValue(value);
      }
      return;
    }

    const controls = animate(0, target, {
      duration: 0.75,
      delay,
      ease: easings.apple,
      onUpdate: (latest) => {
        setDisplayValue(`${latest.toFixed(decimals)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [decimals, delay, isInView, reduceMotion, suffix, target, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

export function ParallaxLayer({
  children,
  className,
  distance = 36,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduceMotion ? 0 : y }}>
      {children}
    </motion.div>
  );
}

export { motion, useReducedMotion, useScroll, useSpring, useTransform };
