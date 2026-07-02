import type { LucideIcon } from "lucide-react";
import { Bus, Camera, ExternalLink, Home, Landmark, Leaf, Navigation, Utensils } from "lucide-react";
import { MotionReveal, blurIn, motion, scaleIn, useReducedMotion } from "../lib/motionPresets";

type AttractionTone = "hub" | "nature" | "experience" | "culture" | "sea" | "food";

type Attraction = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  href: string;
  tone: AttractionTone;
  icon: LucideIcon;
};

const attractions: Attraction[] = [
  {
    id: "terminal",
    title: "Terminal Sekinchan",
    description: "Start at the central hub before exploring Sekinchan.",
    duration: "Start",
    category: "Hub",
    href: "https://www.google.com/maps/search/?api=1&query=Terminal%20Sekinchan%20Ban%203%20Jalan%20Parit%205%2045400%20Sekinchan%20Selangor",
    tone: "hub",
    icon: Home,
  },
  {
    id: "paddy-field-view",
    title: "Paddy Field View",
    description: "Open sawah scenery with wide photo angles.",
    duration: "5 min",
    category: "Nature",
    href: "https://www.google.com/maps/search/?api=1&query=Sekinchan%20Paddy%20Field%20View",
    tone: "nature",
    icon: Leaf,
  },
  {
    id: "sawah-road",
    title: "Sawah Road",
    description: "A classic road-through-paddy view.",
    duration: "15 min",
    category: "Nature",
    href: "https://www.google.com/maps/search/?api=1&query=Sekinchan%20Sawah%20Road",
    tone: "nature",
    icon: Camera,
  },
  {
    id: "paddy-gallery",
    title: "Paddy Gallery",
    description: "Rice journey, exhibits, and easy indoor stop.",
    duration: "7.5 min",
    category: "Experience",
    href: "https://www.google.com/maps/search/?api=1&query=Sekinchan%20Paddy%20Gallery",
    tone: "experience",
    icon: Landmark,
  },
  {
    id: "n16-bus-cafe",
    title: "N16 Bus Cafe",
    description: "Iconic bus cafe with paddy field atmosphere.",
    duration: "8 min",
    category: "Experience",
    href: "https://www.google.com/maps/search/?api=1&query=N16%20Bus%20Cafe%20Sekinchan",
    tone: "experience",
    icon: Bus,
  },
  {
    id: "nan-tian-temple",
    title: "Nan Tian Temple",
    description: "Temple landmark with a paddy backdrop.",
    duration: "15 min",
    category: "Culture",
    href: "https://www.google.com/maps/search/?api=1&query=Nan%20Tian%20Temple%20Sekinchan",
    tone: "culture",
    icon: Landmark,
  },
  {
    id: "bagan-jetty",
    title: "Bagan Jetty",
    description: "Fishing village atmosphere, boats, and seafood.",
    duration: "9 min",
    category: "Sea / Food",
    href: "https://www.google.com/maps/search/?api=1&query=Bagan%20Sekinchan%20Jetty",
    tone: "sea",
    icon: Utensils,
  },
  {
    id: "ah-ma-house",
    title: "Ah Ma House",
    description: "Local snacks and a vintage corner.",
    duration: "19 min",
    category: "Food",
    href: "https://www.google.com/maps/search/?api=1&query=Ah%20Ma%20House%20Sekinchan",
    tone: "food",
    icon: Utensils,
  },
];

const legendItems = [
  { label: "Nature", tone: "nature" },
  { label: "Experience", tone: "experience" },
  { label: "Culture", tone: "culture" },
  { label: "Sea / Food", tone: "sea" },
] as const;

const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Terminal%20Sekinchan%20Ban%203%20Jalan%20Parit%205%2045400%20Sekinchan%20Selangor&z=14&output=embed";
const googleMapsOpenUrl =
  "https://www.google.com/maps/search/?api=1&query=Terminal%20Sekinchan%20Ban%203%20Jalan%20Parit%205%2045400%20Sekinchan%20Selangor";
const googleMapsDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Terminal%20Sekinchan%20Ban%203%20Jalan%20Parit%205%2045400%20Sekinchan%20Selangor&destination=Bagan%20Sekinchan%20Jetty&waypoints=Sekinchan%20Paddy%20Field%20View%7CSekinchan%20Paddy%20Gallery%7CN16%20Bus%20Cafe%20Sekinchan&travelmode=driving";

export function NearbyAttractionsMap() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="nearby-attractions"
      className="page-section page-section--soft nearby-map-section"
      aria-labelledby="nearby-map-title"
    >
      <div className="route-container">
        <MotionReveal className="nearby-map__note" variant={blurIn}>
          Visitors do not simply walk past it. They stop, explore, and capture moments.
        </MotionReveal>

        <MotionReveal className="section-heading nearby-map__heading" variant={blurIn}>
          <p className="route-eyebrow">Nearby Attractions</p>
          <h2 id="nearby-map-title">Terminal Sekinchan nearby attractions</h2>
          <p>Use the live map view, open directions, or choose any nearby stop in Google Maps.</p>
        </MotionReveal>

        <MotionReveal className="nearby-map" aria-label="Clickable nearby attractions map" variant={scaleIn}>
          <div className="nearby-map__canvas-shell">
            <div className="nearby-map__google-frame">
              <iframe
                title="Google map showing Terminal Sekinchan and nearby attractions"
                src={googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="nearby-map__map-actions" aria-label="Map actions">
              <a href={googleMapsOpenUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={16} strokeWidth={2.4} />
                Open Google Maps
              </a>
              <a href={googleMapsDirectionsUrl} target="_blank" rel="noreferrer">
                <Navigation size={16} strokeWidth={2.4} />
                Get Route
              </a>
            </div>

            <div className="nearby-map__stop-grid" aria-label="Nearby attraction links">
              {attractions.map((attraction, index) => {
                const Icon = attraction.icon;

                return (
                  <motion.a
                    key={attraction.id}
                    className={`nearby-map__stop-card nearby-map__stop-card--${attraction.tone}`}
                    href={attraction.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.46, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <span className="nearby-map__stop-icon" aria-hidden="true">
                      <Icon size={16} strokeWidth={2.5} />
                    </span>
                    <span>
                      <strong>{attraction.title}</strong>
                      <small>
                        {attraction.duration} - {attraction.category}
                      </small>
                    </span>
                  </motion.a>
                );
              })}
            </div>

            <div className="nearby-map__legend" aria-label="Map legend">
              {legendItems.map((item) => (
                <span key={item.label}>
                  <i className={`nearby-map__legend-dot nearby-map__legend-dot--${item.tone}`} aria-hidden="true" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
