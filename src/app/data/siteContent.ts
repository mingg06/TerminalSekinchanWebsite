import type { LucideIcon } from "lucide-react";
import terminalSekinchanHeroImage from "../../assets/terminal-sekinchan-hero-generated.png";
import terminalAerialPlaneFieldImage from "../../assets/terminal-aerial-plane-field.jpg";
import terminalSekinchanPlaneCloseupImage from "../../assets/terminal-sekinchan-plane-closeup.png";
import terminalSekinchanStationWideImage from "../../assets/terminal-sekinchan-station-wide.png";
import terminalTrainStationImage from "../../assets/terminal-train-station.png";
import guestAircraftDoorGroupImage from "../../assets/guest-aircraft-door-group.jpg";
import guestPlaneSignImage from "../../assets/guest-plane-sign.jpg";
import guestStationGroupImage from "../../assets/guest-station-group.jpg";
import guestStationSelfieImage from "../../assets/guest-station-selfie.jpg";
import guestTeamPlaneSignImage from "../../assets/guest-team-plane-sign.jpg";
import guestTrainRideImage from "../../assets/guest-train-ride.jpg";
import guestWingGroupImage from "../../assets/guest-wing-group.jpg";
import officialTerminalAerialFieldsImage from "../../assets/official-terminal-aerial-fields.jpeg";
import officialTerminalAerialSiteImage from "../../assets/official-terminal-aerial-site.jpeg";
import officialTerminalPlaneAerialImage from "../../assets/official-terminal-plane-aerial.jpeg";
import officialTerminalStationDroneImage from "../../assets/official-terminal-station-drone.jpeg";
import facebookCockpitVisitImage from "../../assets/facebook-cockpit-visit.jpg";
import facebookEventDiningGroupImage from "../../assets/facebook-event-dining-group.jpg";
import facebookFestivalFieldCrowdImage from "../../assets/facebook-festival-field-crowd.jpg";
import facebookFestivalStageCrowdImage from "../../assets/facebook-festival-stage-crowd.jpg";
import facebookGlampingPosterImage from "../../assets/facebook-glamping-poster.jpg";
import facebookMascotRestStopImage from "../../assets/facebook-mascot-rest-stop.jpg";
import facebookMascotVisitImage from "../../assets/facebook-mascot-visit.jpg";
import facebookNightWingGroupImage from "../../assets/facebook-night-wing-group.jpg";
import facebookPlaneGroupArrivalImage from "../../assets/facebook-plane-group-arrival.jpg";
import facebookPublicVisitPlaneImage from "../../assets/facebook-public-visit-plane.jpg";
import facebookStageGroupPhotoImage from "../../assets/facebook-stage-group-photo.jpg";
import facebookTerminalSignVisitImage from "../../assets/facebook-terminal-sign-visit.jpg";
import {
  CalendarDays,
  Camera,
  Clock,
  Facebook,
  Gift,
  Globe,
  HelpCircle,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Star,
  Ticket,
  Train,
  Users,
  Utensils,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type ContactDetails = {
  address: string;
  phone: string;
  officialWebsite: string;
  mapUrl: string;
  openingHours: string;
  whatsappUrl: string;
};

export type IconContent = {
  icon: LucideIcon;
};

export type VideoLinks = {
  facebookReel: string;
};

export type ExternalLink = IconContent & {
  label: string;
  href: string;
  platform: string;
};

export type HeroImage = {
  src: string;
  alt: string;
  caption: string;
};

export type PagePhotoColumn = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ExperienceSlide = IconContent & {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  href: string;
};

export type TicketCategory = IconContent & {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: "RM";
  unit: string;
  description: string;
  featured?: boolean;
};

export type EventCard = IconContent & {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  ctaLabel: string;
  href: string;
};

export type PublicTourismEvent = {
  id: string;
  title: string;
  month: string;
  year: string;
  image: string;
  alt: string;
  href: string;
};

export type RecognisedVisit = {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  sourceLabel: string;
};

export type PlanVisitItem = IconContent & {
  id: string;
  title: string;
  description: string;
  href?: string;
};

export type Faq = IconContent & {
  question: string;
  answer: string;
};

export type SocialLink = IconContent & {
  label: string;
  href: string;
};

export type UpdateTag = IconContent & {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experiences", href: "/experiences" },
  { label: "Buy Tickets", href: "/tickets" },
  { label: "Dining", href: "/dining" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Partnership", href: "/official" },
  { label: "Contact", href: "/contact" },
];

export const contactDetails: ContactDetails = {
  address: "Ban 3, Jalan Parit 5, 45400 Sekinchan, Selangor",
  phone: "018-870 7777",
  officialWebsite: "https://terminalsekinchan.com",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Ban%203%2C%20Jalan%20Parit%205%2C%2045400%20Sekinchan%2C%20Selangor",
  openingHours: "Daily, 9:00 AM - 8:00 PM",
  whatsappUrl: "https://wa.me/60188707777",
};

export const videoLinks = {
  facebookReel: "https://www.facebook.com/reel/1724692822216726",
} satisfies VideoLinks;

export const externalLinks = [
  {
    label: "Featured Facebook Reel",
    href: videoLinks.facebookReel,
    platform: "Facebook",
    icon: Facebook,
  },
  {
    label: "Official Website",
    href: contactDetails.officialWebsite,
    platform: "Website",
    icon: Globe,
  },
] satisfies ExternalLink[];

export const heroImages = [
  {
    src: terminalSekinchanHeroImage,
    alt: "Boeing 727 landmark at Terminal Sekinchan beside paddy fields under open sky",
    caption: "The Boeing 727 landmark",
  },
  {
    src: "https://visit-sekinchan.com/images/terminal-sekinchan/terminal-sekinchan-kapal-terbang-fb-hartini.jpg",
    alt: "Sekinchan paddy fields near Terminal Sekinchan",
    caption: "Terminal Sekinchan landscape",
  },
  {
    src: terminalTrainStationImage,
    alt: "Terminal Sekinchan train station and mini train beside the paddy fields",
    caption: "Paddy field train ride",
  },
] satisfies HeroImage[];

export const pagePhotoColumns = {
  home: [
    {
      id: "home-guest-plane-sign",
      title: "Guest aircraft moment",
      description: "Visitors posing with the Terminal Sekinchan aircraft sign.",
      image: guestPlaneSignImage,
      alt: "Visitors taking a photo with the Terminal Sekinchan aircraft sign",
    },
    {
      id: "home-guest-train",
      title: "Train ride smiles",
      description: "Guests enjoying the ride with paddy fields outside.",
      image: guestTrainRideImage,
      alt: "Guests riding the Terminal Sekinchan train with paddy fields outside",
    },
    {
      id: "home-guest-station",
      title: "Station group photo",
      description: "A group photo at the Terminal Sekinchan station platform.",
      image: guestStationGroupImage,
      alt: "Group of guests taking a photo at the Terminal Sekinchan station",
    },
    {
      id: "home-guest-wing",
      title: "Aircraft wing photo",
      description: "A group photo on the aircraft wing area.",
      image: guestWingGroupImage,
      alt: "Guests posing together on the Terminal Sekinchan aircraft wing",
    },
  ],
  experiences: [
    {
      id: "experience-plane-closeup",
      title: "Colourful Boeing 727 landmark",
      description: "A close view of the wrapped aircraft and Terminal Sekinchan sign.",
      image: terminalSekinchanPlaneCloseupImage,
      alt: "Colourful Terminal Sekinchan Boeing 727 landmark and sign",
    },
    {
      id: "experience-cockpit",
      title: "Cockpit visit",
      description: "The aircraft interior gives visitors another memorable photo stop.",
      image: facebookCockpitVisitImage,
      alt: "Visitors smiling inside the Terminal Sekinchan cockpit",
    },
    {
      id: "experience-mascot-stop",
      title: "Mascot photo stop",
      description: "Friendly character moments add a playful stop for families and visitors.",
      image: facebookMascotVisitImage,
      alt: "Visitors posing with Terminal Sekinchan mascot decorations",
    },
    {
      id: "experience-station-wide",
      title: "Station view",
      description: "The station and paddy-field view give visitors another clear photo stop.",
      image: terminalSekinchanStationWideImage,
      alt: "Terminal Sekinchan station and mini train beside paddy fields",
    },
    {
      id: "experience-aerial-plane",
      title: "Aircraft in the fields",
      description: "The Boeing 727 sits inside the paddy-field landscape that makes the stop memorable.",
      image: officialTerminalPlaneAerialImage,
      alt: "Aerial view of the Terminal Sekinchan Boeing 727 beside paddy fields",
    },
    {
      id: "experience-site-aerial",
      title: "Full site view",
      description: "The wider site sits inside Sekinchan's open paddy-field setting.",
      image: officialTerminalAerialSiteImage,
      alt: "Aerial view of the Terminal Sekinchan site",
    },
    {
      id: "experience-public-visit",
      title: "Public visit moment",
      description: "The aircraft remains a recognisable backdrop for official and visitor photos.",
      image: facebookPublicVisitPlaneImage,
      alt: "Public visit group photo beside the Terminal Sekinchan aircraft",
    },
  ],
  tickets: [
    {
      id: "ticket-train-platform",
      title: "Before boarding",
      description: "Check your ride time, gather the group, and keep the ticket request ready.",
      image: terminalTrainStationImage,
      alt: "Mini train platform at Terminal Sekinchan",
    },
    {
      id: "ticket-family-ride",
      title: "Family ride",
      description: "The ticket flow is designed around short, easy group visits.",
      image: facebookTerminalSignVisitImage,
      alt: "Family-friendly train ride setting at Terminal Sekinchan",
    },
    {
      id: "ticket-fields",
      title: "Ride scenery",
      description: "The paddy field route is the main reason to plan a ride in advance.",
      image: officialTerminalAerialFieldsImage,
      alt: "Paddy fields around Terminal Sekinchan",
    },
    {
      id: "ticket-station-wide",
      title: "Station stop",
      description: "The station, mini train, and paddy-field setting are part of the ticketed ride experience.",
      image: terminalSekinchanStationWideImage,
      alt: "Terminal Sekinchan station and mini train beside paddy fields",
    },
  ],
  dining: [
    {
      id: "dining-stop",
      title: "Meal break",
      description: "Plan food before or after the aircraft photos and train ride.",
      image: facebookEventDiningGroupImage,
      alt: "Terminal Sekinchan dining and attraction area",
    },
    {
      id: "dining-family",
      title: "Family tables",
      description: "A relaxed stop works best for families, birthdays, and small groups.",
      image: facebookMascotRestStopImage,
      alt: "Family-friendly Terminal Sekinchan landmark",
    },
    {
      id: "dining-fields",
      title: "Countryside view",
      description: "The paddy-field setting makes the meal stop part of the visit.",
      image: officialTerminalAerialFieldsImage,
      alt: "Countryside view around Terminal Sekinchan",
    },
    {
      id: "dining-station",
      title: "After the train",
      description: "The station area gives guests an easy place to pause before continuing the visit.",
      image: officialTerminalStationDroneImage,
      alt: "Terminal Sekinchan station and train area from above",
    },
    {
      id: "dining-group-stop",
      title: "Group meal stop",
      description: "Large tables work well when the visit is planned as a group day out.",
      image: facebookEventDiningGroupImage,
      alt: "Group dining moment at Terminal Sekinchan",
    },
  ],
  events: [
    {
      id: "event-family-plane",
      title: "Family celebration backdrop",
      description: "The aircraft and paddy fields create a bold setting for birthdays and family groups.",
      image: facebookPlaneGroupArrivalImage,
      alt: "Family celebration setting near the Terminal Sekinchan aircraft",
    },
    {
      id: "event-team-plane",
      title: "Group arrival photo",
      description: "The aircraft sign gives event groups a clear first photo moment.",
      image: facebookTerminalSignVisitImage,
      alt: "Group of guests posing with the Terminal Sekinchan aircraft sign",
    },
    {
      id: "event-station-group",
      title: "Station gathering",
      description: "The station platform works well for small groups and private bookings.",
      image: guestStationSelfieImage,
      alt: "Guests taking a selfie together at the Terminal Sekinchan station",
    },
    {
      id: "event-aircraft-door",
      title: "Aircraft group photo",
      description: "Groups can use the aircraft doorway as a memorable event backdrop.",
      image: guestAircraftDoorGroupImage,
      alt: "Group of guests posing at the Terminal Sekinchan aircraft doorway",
    },
    {
      id: "event-aerial-site",
      title: "Large outdoor site",
      description: "The wider site can support public programmes, festivals, and large group moments.",
      image: facebookFestivalFieldCrowdImage,
      alt: "Aerial view of Terminal Sekinchan and surrounding paddy fields",
    },
    {
      id: "event-plane-aerial",
      title: "Brandable aircraft setting",
      description: "The aircraft creates a recognisable outdoor backdrop for launches and public moments.",
      image: officialTerminalPlaneAerialImage,
      alt: "Aerial view of the Terminal Sekinchan Boeing 727 attraction",
    },
    {
      id: "event-festival-stage",
      title: "Festival stage crowd",
      description: "Terminal Sekinchan can host high-energy public programmes and outdoor festival moments.",
      image: facebookFestivalStageCrowdImage,
      alt: "Festival crowd and stage programme at Terminal Sekinchan",
    },
    {
      id: "event-stage-group",
      title: "Stage group photo",
      description: "Public event groups can use the site as a strong closing photo location.",
      image: facebookStageGroupPhotoImage,
      alt: "Large group photo on a Terminal Sekinchan event stage",
    },
    {
      id: "event-night-wing",
      title: "Night aircraft moment",
      description: "The aircraft setting also works for evening and after-event group photos.",
      image: facebookNightWingGroupImage,
      alt: "Group photo at night beside the Terminal Sekinchan aircraft wing",
    },
  ],
  contact: [
    {
      id: "contact-arrival",
      title: "Arrive at Parit 5",
      description: "Use the address and map link before starting the final drive into the fields.",
      image:
        "https://visit-sekinchan.com/images/terminal-sekinchan/terminal-sekinchan-kapal-terbang-fb-hartini.jpg",
      alt: "Road and paddy field landscape near Terminal Sekinchan",
    },
    {
      id: "contact-landmark",
      title: "Look for the plane",
      description: "The Boeing 727 makes the destination easy to recognize on arrival.",
      image: terminalSekinchanPlaneCloseupImage,
      alt: "Terminal Sekinchan Boeing 727 landmark",
    },
    {
      id: "contact-train",
      title: "Confirm details",
      description: "Contact the team for tickets, tables, events, and group visits.",
      image: terminalTrainStationImage,
      alt: "Terminal Sekinchan train area",
    },
    {
      id: "contact-aerial",
      title: "Find the full site",
      description: "Use the map to reach the aircraft, station, and parking area inside the paddy-field setting.",
      image: officialTerminalAerialSiteImage,
      alt: "Aerial view of Terminal Sekinchan site and surrounding fields",
    },
  ],
} satisfies Record<string, PagePhotoColumn[]>;

export const experienceSlides = [
  {
    id: "boeing-727",
    title: "The Boeing 727",
    eyebrow: "Signature Landmark",
    description:
      "Step close to a retired aircraft set dramatically against Sekinchan's open rice fields.",
    image: terminalSekinchanPlaneCloseupImage,
    href: "/about",
    icon: Plane,
  },
  {
    id: "paddy-field-train",
    title: "Paddy Field Train Ride",
    eyebrow: "New Attraction",
    description:
      "Ride through real paddy-field scenery for an easy family-friendly view of Sekinchan's landscape.",
    image: terminalTrainStationImage,
    href: "/tickets",
    icon: Train,
  },
  {
    id: "premium-outlet-cafe",
    title: "Dining at Terminal Sekinchan",
    eyebrow: "Food And Drinks",
    description:
      "Pause between attractions for a relaxed meal at Terminal Sekinchan.",
    image: terminalAerialPlaneFieldImage,
    href: "/dining",
    icon: Utensils,
  },
] satisfies ExperienceSlide[];

export const ticketCategories = [
  {
    id: "malaysian",
    name: "Malaysian",
    price: 20,
    currency: "RM",
    unit: "person",
    description: "Entry for Malaysian visitors. MyKad verification may be required.",
    icon: Ticket,
  },
  {
    id: "non-malaysian",
    name: "Non-Malaysian",
    price: 30,
    currency: "RM",
    unit: "person",
    description: "Entry for international visitors.",
    icon: Globe,
  },
  {
    id: "senior-citizen",
    name: "Senior Citizen",
    price: 15,
    currency: "RM",
    unit: "person",
    description: "Discounted entry for eligible senior visitors.",
    icon: Users,
  },
  {
    id: "family-bundle",
    name: "Family Bundle",
    price: 70,
    originalPrice: 80,
    currency: "RM",
    unit: "bundle",
    description: "A better-value bundle for families visiting together.",
    icon: Gift,
    featured: true,
  },
] satisfies TicketCategory[];

export const eventCards = [
  {
    id: "birthday-party",
    title: "Birthday Party",
    category: "Private Events",
    description:
      "Celebrate with the Boeing 727 and paddy fields as a memorable family photo backdrop.",
    image: facebookPlaneGroupArrivalImage,
    ctaLabel: "Enquire Now",
    href: "/events#event-booking",
    icon: Gift,
  },
  {
    id: "group-school-visit",
    title: "Group And School Visits",
    category: "Group Booking",
    description:
      "Plan an easy day trip for schools, tour groups, and community groups visiting Sekinchan.",
    image: facebookFestivalFieldCrowdImage,
    ctaLabel: "Plan A Group Visit",
    href: "/contact?type=group",
    icon: Users,
  },
  {
    id: "weekend-photo-walk",
    title: "Weekend Photo Walk",
    category: "Weekend",
    description:
      "Use golden-hour aircraft details and train scenes for a relaxed photo session.",
    image: facebookNightWingGroupImage,
    ctaLabel: "View Events",
    href: "/events",
    icon: Camera,
  },
] satisfies EventCard[];

export const publicTourismEvents = [
  {
    id: "sekinchan-ultra-race-2026",
    month: "OCT",
    year: "2026",
    title: "Sekinchan Ultra Race",
    image: "https://terminalsekinchan.com/wp-content/uploads/2026/01/Untitled-2-06.png",
    alt: "Sekinchan Ultra Race 2026 event image",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "largest-mini-train-soft-launch-2026",
    month: "MAY",
    year: "2026",
    title: "Soft Launch Of Malaysia's Largest Mini Train",
    image: facebookStageGroupPhotoImage,
    alt: "Terminal Sekinchan public programme stage group photo",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "festival-sawah-padi-sekinchan-2026",
    month: "APR",
    year: "2026",
    title: "Festival Sawah Padi Sekinchan",
    image: "https://terminalsekinchan.com/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-19-at-2.04.16-PM-1.jpeg",
    alt: "Festival Sawah Padi Sekinchan 2026 event image",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "tahun-melawat-selangor-sabak-bernam-2026",
    month: "FEB",
    year: "2026",
    title: "Majlis Pelancaran Tahun Melawat Selangor Daerah Sabak Bernam",
    image: "https://terminalsekinchan.com/wp-content/uploads/2026/01/494435878_1216572280475944_2706640530800030486_n-1536x1536.jpg",
    alt: "Tahun Melawat Selangor Sabak Bernam launch event image",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "sekinchan-ultra-2025",
    month: "NOV",
    year: "2025",
    title: "Sekinchan Ultra 2025",
    image: facebookPublicVisitPlaneImage,
    alt: "Sekinchan Ultra 2025 event image",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "interactive-4x4-challenge-2025",
    month: "APR",
    year: "2025",
    title: "4x4 Challenge And Interactive Experiences",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-11-1228x1536.jpg",
    alt: "4x4 challenge and interactive experiences event poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "glamping-setup-2025",
    month: "APR",
    year: "2025",
    title: "Glamping Setup",
    image: facebookGlampingPosterImage,
    alt: "Glamping setup highlight at Terminal Sekinchan",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "kpj-health-screening-2025",
    month: "APR",
    year: "2025",
    title: "Free Health Screening By KPJ Healthcare",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-4-1229x1536.jpg",
    alt: "Free health screening by KPJ Healthcare event poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "cultural-performances-2025",
    month: "APR",
    year: "2025",
    title: "Cultural Performances By Local Art Groups",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-8-1229x1536.jpg",
    alt: "Cultural performances at Festival Sawah Padi Sekinchan poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "tram-rides-paddy-fields-2025",
    month: "APR",
    year: "2025",
    title: "Tram Rides Around The Paddy Fields",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-3-1229x1536.jpg",
    alt: "Tram rides around the paddy fields event poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "food-festival-pasar-palong-2025",
    month: "APR",
    year: "2025",
    title: "Food Festival & Pasar Palong",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-7-1229x1536.jpg",
    alt: "Food Festival and Pasar Palong 2025 poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "sekinchan-travel-hunt-2025",
    month: "APR",
    year: "2025",
    title: "Sekinchan Travel Hunt",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-2-1229x1536.jpg",
    alt: "Sekinchan Travel Hunt 2025 poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "paddy-field-runs-2025",
    month: "APR",
    year: "2025",
    title: "Paddy Field Runs (5km & 10km)",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-14-larian-1229x1536.jpg",
    alt: "Paddy Field Runs 5km and 10km 2025 poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "festival-sawah-padi-sekinchan-2025",
    month: "APR",
    year: "2025",
    title: "Festival Sawah Padi Sekinchan",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-1-1229x1536.jpg",
    alt: "Festival Sawah Padi Sekinchan 2025 poster",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
  {
    id: "golden-paddy-half-marathon-2025",
    month: "JAN",
    year: "2025",
    title: "Golden Paddy Half Marathon (GPHM) 2025",
    image: "https://terminalsekinchan.com/wp-content/uploads/2026/01/event_banner_1730872191-1536x568.jpeg",
    alt: "Golden Paddy Half Marathon 2025 event banner",
    href: "https://www.facebook.com/Terminal.Sekinchan",
  },
] satisfies PublicTourismEvent[];

export const recognisedVisits = [
  {
    id: "festival-sawah-padi-opening-2025",
    title: "Festival Sawah Padi 2025 Opening",
    label: "Minister Visit",
    description:
      "Opened at Terminal Sekinchan by Selangor Menteri Besar Dato' Seri Amirudin Shari.",
    image:
      "https://mssb-media.xcms.io/publisher-5bfcce28b99302cf1f60496d8d90a05d/2025/04/37954a600f752f3ab71004799cd02d50.jpg",
    alt: "Festival Sawah Padi Sekinchan 2025 opening ceremony coverage",
    href: "https://mediaselangor.com/ms/2025/04/262338/sasar-13000-pengunjung-meriahkan-festival-sawah-padi-sekinchan-2025",
    sourceLabel: "Media Selangor",
  },
  {
    id: "tourism-leadership-visit",
    title: "Tourism Leadership Visit",
    label: "Official Visit",
    description:
      "Tourism programme coverage featured Datuk Ng Suee Lim and the Festival Sawah Padi event at Terminal Sekinchan.",
    image: "https://apicms.thestar.com.my/uploads/images/2025/06/07/3354685.jpeg",
    alt: "Terminal Sekinchan tourism event coverage in The Star",
    href: "https://www.thestar.com.my/metro/metro-news/2025/06/07/surge-in-foreign-tourists-visiting-sgor-in-lead-up-to-vsy-2025",
    sourceLabel: "The Star",
  },
  {
    id: "aizat-amdan-event-performance",
    title: "Aizat Amdan Performance",
    label: "Celebrity Moment",
    description:
      "Festival programming included Malaysian singer-songwriter Aizat Amdan as part of the public event lineup.",
    image:
      "https://terminalsekinchan.com/wp-content/uploads/2026/01/poster_festival_sawah_padi_sekinchan_26-27apr2025-1-1229x1536.jpg",
    alt: "Festival Sawah Padi Sekinchan 2025 public event poster",
    href: "https://www.thestar.com.my/metro/metro-news/2025/06/07/surge-in-foreign-tourists-visiting-sgor-in-lead-up-to-vsy-2025",
    sourceLabel: "The Star",
  },
] satisfies RecognisedVisit[];

export const planVisitItems = [
  {
    id: "address",
    title: "Address",
    description: contactDetails.address,
    href: contactDetails.mapUrl,
    icon: MapPin,
  },
  {
    id: "hours",
    title: "Opening Hours",
    description: contactDetails.openingHours,
    icon: Clock,
  },
  {
    id: "getting-here",
    title: "Directions",
    description: "Open Google Maps for navigation to Terminal Sekinchan.",
    href: contactDetails.mapUrl,
    icon: MapPin,
  },
  {
    id: "contact",
    title: "Contact",
    description: contactDetails.phone,
    href: contactDetails.whatsappUrl,
    icon: Phone,
  },
] satisfies PlanVisitItem[];

export const faqs = [
  {
    question: "What are Terminal Sekinchan's opening hours?",
    answer: contactDetails.openingHours,
    icon: Clock,
  },
  {
    question: "Where is Terminal Sekinchan located?",
    answer: contactDetails.address,
    icon: MapPin,
  },
  {
    question: "How much are tickets?",
    answer:
      "Tickets start from RM20 for Malaysian visitors, RM30 for non-Malaysian visitors, RM15 for senior citizens, and RM70 for the family bundle.",
    icon: Ticket,
  },
  {
    question: "How can I contact Terminal Sekinchan?",
    answer: `Call or WhatsApp ${contactDetails.phone}.`,
    icon: MessageCircle,
  },
  {
    question: "Is this a good place for photos?",
    answer:
      "Yes. The Boeing 727, paddy field train, and open field scenery are the main photo-led experiences.",
    icon: Star,
  },
  {
    question: "Can I plan a group or birthday visit?",
    answer:
      "Yes. Use the contact page or WhatsApp number to enquire about group visits and private events.",
    icon: HelpCircle,
  },
] satisfies Faq[];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/terminalsekinchan", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/terminalsekinchan", icon: Facebook },
  { label: "Email", href: "mailto:hello@terminalsekinchan.com", icon: Mail },
] satisfies SocialLink[];

export const updateTags = [
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Directions", href: contactDetails.mapUrl, icon: MapPin },
  { label: "Tickets", href: "/tickets", icon: Ticket },
] satisfies UpdateTag[];
