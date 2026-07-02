import { useId, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Plane, Train, Utensils } from "lucide-react";
import { PhotoHero } from "../components/PhotoHero";
import { ResilientImage } from "../components/ResilientImage";
import { SocialFeedEmbed } from "../components/SocialFeedEmbed";
import {
  MotionReveal,
  blurIn,
  motion,
  scaleIn,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "../lib/motionPresets";
import terminalSekinchanVideo from "../../assets/terminal-sekinchan-video.mp4";
import {
  contactDetails,
  heroImages,
} from "../data/siteContent";

const homeActivities = [
  {
    title: "Boeing 727 Experience",
    subtitle: "Aircraft landmark photos",
    category: "Signature Attraction",
    badge: "Must Visit",
    description:
      "Experience the iconic Boeing 727 surrounded by the beautiful Sekinchan paddy fields. Walk around the aircraft, capture unforgettable photos, and discover one of Malaysia's most unique attractions.",
    image: heroImages[0].src,
    alt: heroImages[0].alt,
    href: "/experiences",
    ctaLabel: "Explore Boeing 727",
    icon: Plane,
  },
  {
    title: "Scenic Train Ride",
    subtitle: "Relaxed paddy-field route",
    category: "Ticketed Ride",
    badge: "Family Friendly",
    description:
      "Hop aboard the scenic train and enjoy a relaxing journey through the picturesque countryside, taking in panoramic views of the lush green paddy fields.",
    image: heroImages[2].src,
    alt: heroImages[2].alt,
    href: "/tickets",
    ctaLabel: "Book Train Ride",
    icon: Train,
  },
  {
    title: "Dining Experience",
    subtitle: "Local food with field views",
    category: "Food & Cafe",
    badge: "Most Popular",
    description:
      "Enjoy delicious local cuisine and cafe favourites while overlooking the peaceful paddy fields. Perfect for families, friends, and weekend getaways.",
    image: heroImages[1].src,
    alt: heroImages[1].alt,
    href: "/dining",
    ctaLabel: "Reserve Dining",
    icon: Utensils,
  },
];

export function HomePage() {
  const videoTitleId = useId();
  const flowTitleId = useId();
  const activitiesRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: activitiesRef,
    offset: ["start start", "end end"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.45,
    restDelta: 0.0008,
  });

  const boeingY = useTransform(smoothScrollProgress, [0, 0.45, 0.62, 1], ["0%", "-3%", "-7%", "-12%"]);
  const boeingScale = useTransform(smoothScrollProgress, [0, 0.45, 0.62, 1], [1, 0.985, 0.955, 0.93]);
  const boeingOpacity = useTransform(smoothScrollProgress, [0, 0.55, 0.9], [1, 0.86, 0.68]);
  const boeingRadius = useTransform(smoothScrollProgress, [0, 0.55, 1], ["24px", "28px", "34px"]);
  const boeingShadow = useTransform(
    smoothScrollProgress,
    [0, 0.5, 1],
    [
      "0 30px 90px rgba(22, 91, 51, 0.18)",
      "0 20px 64px rgba(22, 91, 51, 0.14)",
      "0 14px 42px rgba(22, 91, 51, 0.1)",
    ]
  );

  const trainY = useTransform(smoothScrollProgress, [0, 0.12, 0.48, 0.64, 1], ["104%", "104%", "0%", "0%", "-7%"]);
  const trainScale = useTransform(smoothScrollProgress, [0, 0.48, 0.72, 1], [0.975, 1, 0.985, 0.95]);
  const trainOpacity = useTransform(smoothScrollProgress, [0, 0.18, 0.48, 1], [0.94, 0.98, 1, 0.82]);
  const trainRadius = useTransform(smoothScrollProgress, [0, 0.48, 1], ["28px", "24px", "32px"]);
  const trainShadow = useTransform(
    smoothScrollProgress,
    [0, 0.48, 1],
    [
      "0 18px 46px rgba(22, 91, 51, 0.12)",
      "0 30px 90px rgba(22, 91, 51, 0.18)",
      "0 18px 54px rgba(22, 91, 51, 0.12)",
    ]
  );

  const diningY = useTransform(smoothScrollProgress, [0, 0.48, 0.58, 0.92, 1], ["116%", "116%", "104%", "0%", "0%"]);
  const diningScale = useTransform(smoothScrollProgress, [0, 0.58, 0.92, 1], [0.965, 0.975, 1, 1]);
  const diningOpacity = useTransform(smoothScrollProgress, [0, 0.58, 0.92, 1], [0.9, 0.96, 1, 1]);
  const diningRadius = useTransform(smoothScrollProgress, [0, 0.92, 1], ["32px", "24px", "24px"]);
  const diningShadow = useTransform(
    smoothScrollProgress,
    [0, 0.92, 1],
    [
      "0 12px 34px rgba(22, 91, 51, 0.1)",
      "0 30px 90px rgba(22, 91, 51, 0.18)",
      "0 30px 90px rgba(22, 91, 51, 0.18)",
    ]
  );

  const scrollCardStyles = [
    {
      y: reduceMotion ? "0%" : boeingY,
      scale: reduceMotion ? 1 : boeingScale,
      opacity: reduceMotion ? 1 : boeingOpacity,
      borderRadius: reduceMotion ? "24px" : boeingRadius,
      boxShadow: reduceMotion ? "0 20px 60px rgba(22, 91, 51, 0.12)" : boeingShadow,
      zIndex: 1,
    },
    {
      y: reduceMotion ? "0%" : trainY,
      scale: reduceMotion ? 1 : trainScale,
      opacity: reduceMotion ? 1 : trainOpacity,
      borderRadius: reduceMotion ? "24px" : trainRadius,
      boxShadow: reduceMotion ? "0 20px 60px rgba(22, 91, 51, 0.12)" : trainShadow,
      zIndex: 2,
    },
    {
      y: reduceMotion ? "0%" : diningY,
      scale: reduceMotion ? 1 : diningScale,
      opacity: reduceMotion ? 1 : diningOpacity,
      borderRadius: reduceMotion ? "24px" : diningRadius,
      boxShadow: reduceMotion ? "0 20px 60px rgba(22, 91, 51, 0.12)" : diningShadow,
      zIndex: 3,
    },
  ];

  return (
    <main className="page-shell">
      <PhotoHero
        eyebrow="Parit 5, Sekinchan, Selangor"
        title="Terminal Sekinchan"
        description="Family fun takes off beside the Boeing 727, paddy fields, mini train, and photo stops."
        primaryAction={{ label: "Plan Your Visit", href: "#plan-your-visit" }}
        secondaryActions={[
          { label: "Get Directions", href: contactDetails.mapUrl },
          { label: "Explore Experiences", href: "/experiences" },
        ]}
      />

      <section
        id="plan-your-visit"
        ref={activitiesRef}
        className="home-flow home-scroll-story"
        aria-labelledby={flowTitleId}
      >
        <div className="route-container home-scroll-story__sticky">
          <div className="section-heading section-heading--compact home-flow__heading">
            <p className="route-eyebrow">Activities</p>
            <h2 id={flowTitleId}>Activities you can explore</h2>
            <p>See the main things guests come for: aircraft photos, mini train rides, and a relaxed food stop.</p>
          </div>

          <div className="home-scroll-story__deck" role="list" aria-label="Featured activities">
            {homeActivities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <motion.article
                  key={activity.title}
                  className="home-scroll-card"
                  data-card-index={index}
                  role="listitem"
                  style={scrollCardStyles[index]}
                >
                  <ResilientImage className="home-scroll-card__image" src={activity.image} alt={activity.alt} />
                  <span className="home-scroll-card__scrim" aria-hidden="true" />
                  <div className="home-scroll-card__content">
                    <div className="home-scroll-card__meta">
                      <span>
                        <Icon size={18} strokeWidth={2.4} aria-hidden="true" />
                        {activity.category}
                      </span>
                      <span>{activity.badge}</span>
                    </div>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <Link to={activity.href} className="home-scroll-card__cta">
                      <span>{activity.ctaLabel}</span>
                      <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <SocialFeedEmbed />

      <section
        id="terminal-video"
        className="page-section home-video-section"
        aria-labelledby={videoTitleId}
      >
        <div className="route-container">
          <MotionReveal className="section-heading section-heading--compact" variant={blurIn}>
            <p className="route-eyebrow">Watch The Experience</p>
            <h2 id={videoTitleId}>Terminal Sekinchan in motion</h2>
            <p>See the aircraft landmark, paddy field setting, and family-friendly visit atmosphere.</p>
          </MotionReveal>

          <MotionReveal className="home-video" variant={scaleIn} amount={0.28}>
            <video
              className="home-video__media"
              src={terminalSekinchanVideo}
              controls
              muted
              playsInline
              preload="metadata"
            />
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
