import { FormEvent, useState } from "react";
import { Link } from "react-router";
import { Building2, ExternalLink, MessageCircle, Users } from "lucide-react";
import selangorRoyalVisitArrival from "../../assets/selangor-royal-visit-arrival.jpg";
import selangorRoyalVisitCockpit from "../../assets/selangor-royal-visit-cockpit.jpg";
import selangorRoyalVisitGroup from "../../assets/selangor-royal-visit-group.jpg";
import selangorRoyalVisitPlane from "../../assets/selangor-royal-visit-plane.jpg";
import { PhotoColumns } from "../components/PhotoColumns";
import { ResilientImage } from "../components/ResilientImage";
import {
  contactDetails,
  eventCards,
  experienceSlides,
  heroImages,
  pagePhotoColumns,
  recognisedVisits,
} from "../data/siteContent";
import { createWhatsAppUrl } from "../lib/whatsapp";
import {
  MotionReveal,
  StaggerGroup,
  StaggerItem,
  blurIn,
  fadeLeft,
  fadeRight,
  motion,
  scaleIn,
  useReducedMotion,
} from "../lib/motionPresets";

const birthdayEvent = eventCards.find((event) => event.id === "birthday-party") ?? eventCards[0];
const trainExperience =
  experienceSlides.find((slide) => slide.id === "paddy-field-train") ?? experienceSlides[0];
const boeingExperience =
  experienceSlides.find((slide) => slide.id === "boeing-727") ?? experienceSlides[0];

const privateBookings = [
  {
    id: "birthday-parties",
    title: "Birthday Parties",
    category: "Private Booking",
    description: birthdayEvent.description,
    image: birthdayEvent.image,
    alt: birthdayEvent.title,
    href: "/events#event-booking",
    ctaLabel: birthdayEvent.ctaLabel,
    icon: birthdayEvent.icon,
  },
  {
    id: "team-building",
    title: "Team Building",
    category: "Private Booking",
    description: "Bring teams together with the aircraft landmark, simple group activities, and easy photo stops.",
    image: trainExperience.image,
    alt: trainExperience.title,
    href: "/events#event-booking",
    ctaLabel: "Enquire Now",
    icon: Users,
  },
  {
    id: "venue-hire",
    title: "Venue Hire",
    category: "Private Booking",
    description: "Use the aircraft landmark and terminal setting for launches, gatherings, and tours.",
    image: boeingExperience.image,
    alt: boeingExperience.title,
    href: "/events#event-booking",
    ctaLabel: "Ask About Hire",
    icon: Building2,
  },
];

const eventBookingTypes = [
  "Birthday party",
  "Team building",
  "Venue hire",
  "School or group visit",
  "Festival or public event",
  "Other event",
];

const selangorRoyalVisitPhotos = [
  {
    id: "cockpit",
    image: selangorRoyalVisitCockpit,
    alt: "Selangor royal visit inside the Terminal Sekinchan Boeing 727 cockpit",
  },
  {
    id: "arrival",
    image: selangorRoyalVisitArrival,
    alt: "Selangor royal visit guests speaking outdoors at Terminal Sekinchan",
  },
  {
    id: "plane",
    image: selangorRoyalVisitPlane,
    alt: "Selangor royal visit group photo beside the Terminal Sekinchan aircraft",
  },
  {
    id: "group",
    image: selangorRoyalVisitGroup,
    alt: "Selangor royal visit group photo inside the Terminal Sekinchan attraction",
  },
];

type EventBookingErrors = Partial<{
  eventDate: string;
  groupSize: string;
  name: string;
  phone: string;
  message: string;
}>;

type EventBookingHandoff = {
  message: string;
  whatsappUrl: string;
};

function FormError({ id, children }: { id: string; children: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      id={id}
      className="booking-form__error"
      initial={reduceMotion ? false : { opacity: 0, y: -4 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );
}

type EventCardProps = {
  card: (typeof privateBookings)[number];
};

function EventCard({ card }: EventCardProps) {
  const Icon = card.icon;

  return (
    <article className="event-card">
      <ResilientImage className="event-card__image" src={card.image} alt={card.alt} />
      <div className="event-card__body">
        <div className="event-card__meta">
          <span className="event-card__icon" aria-hidden="true">
            <Icon size={17} strokeWidth={2.4} />
          </span>
          <p className="route-eyebrow">{card.category}</p>
        </div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <Link to={card.href} className="event-card__link">
          {card.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

function EventBookingForm() {
  const [bookingErrors, setBookingErrors] = useState<EventBookingErrors>({});
  const [bookingHandoff, setBookingHandoff] = useState<EventBookingHandoff | null>(null);
  const reduceMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const eventType = String(formData.get("eventType") ?? eventBookingTypes[0]);
    const eventDate = String(formData.get("eventDate") ?? "").trim();
    const groupSize = String(formData.get("groupSize") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: EventBookingErrors = {};

    setBookingHandoff(null);

    if (!eventDate) {
      nextErrors.eventDate = "Choose a preferred date.";
    }

    if (!groupSize || Number.parseInt(groupSize, 10) <= 0) {
      nextErrors.groupSize = "Enter the estimated number of guests.";
    }

    if (!name) {
      nextErrors.name = "Enter your name.";
    }

    if (!phone) {
      nextErrors.phone = "Enter a phone number.";
    }

    setBookingErrors(nextErrors);

    const firstErrorField = Object.keys(nextErrors)[0];

    if (firstErrorField) {
      const field = form.elements.namedItem(firstErrorField);

      if (field instanceof HTMLElement) {
        field.focus();
      }

      return;
    }

    setBookingHandoff({
      message: "Event enquiry ready. Send it on WhatsApp to check availability.",
      whatsappUrl: createWhatsAppUrl(
        contactDetails.whatsappUrl,
        [
          "Hello Terminal Sekinchan, I would like to book an event.",
          `Event type: ${eventType}`,
          `Preferred date: ${eventDate}`,
          `Estimated guests: ${groupSize}`,
          `Name: ${name}`,
          `Phone: ${phone}`,
          message ? `Notes: ${message}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      ),
    });
    form.reset();
  }

  return (
    <form className="booking-form event-booking-form" onSubmit={handleSubmit} noValidate>
      <p className="booking-form__wide booking-form__hint">
        Fields marked required are required.
      </p>

      <label htmlFor="event-booking-type">
        Event type
        <select id="event-booking-type" name="eventType" defaultValue={eventBookingTypes[0]}>
          {eventBookingTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <label htmlFor="event-booking-date">
        <span className="booking-form__label-text">
          Preferred date <span className="booking-form__required">required</span>
        </span>
        <input
          id="event-booking-date"
          name="eventDate"
          type="date"
          aria-invalid={bookingErrors.eventDate ? "true" : undefined}
          aria-describedby={bookingErrors.eventDate ? "event-booking-date-error" : undefined}
          required
        />
        {bookingErrors.eventDate ? (
          <FormError id="event-booking-date-error">{bookingErrors.eventDate}</FormError>
        ) : null}
      </label>

      <label htmlFor="event-booking-group-size">
        <span className="booking-form__label-text">
          Guests <span className="booking-form__required">required</span>
        </span>
        <input
          id="event-booking-group-size"
          name="groupSize"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="30"
          aria-invalid={bookingErrors.groupSize ? "true" : undefined}
          aria-describedby={bookingErrors.groupSize ? "event-booking-group-size-error" : undefined}
          required
        />
        {bookingErrors.groupSize ? (
          <FormError id="event-booking-group-size-error">{bookingErrors.groupSize}</FormError>
        ) : null}
      </label>

      <label htmlFor="event-booking-name">
        <span className="booking-form__label-text">
          Name <span className="booking-form__required">required</span>
        </span>
        <input
          id="event-booking-name"
          name="name"
          type="text"
          autoComplete="name"
          spellCheck={false}
          aria-invalid={bookingErrors.name ? "true" : undefined}
          aria-describedby={bookingErrors.name ? "event-booking-name-error" : undefined}
          required
        />
        {bookingErrors.name ? (
          <FormError id="event-booking-name-error">{bookingErrors.name}</FormError>
        ) : null}
      </label>

      <label htmlFor="event-booking-phone">
        <span className="booking-form__label-text">
          Phone <span className="booking-form__required">required</span>
        </span>
        <input
          id="event-booking-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          spellCheck={false}
          aria-invalid={bookingErrors.phone ? "true" : undefined}
          aria-describedby={bookingErrors.phone ? "event-booking-phone-error" : undefined}
          required
        />
        {bookingErrors.phone ? (
          <FormError id="event-booking-phone-error">{bookingErrors.phone}</FormError>
        ) : null}
      </label>

      <label htmlFor="event-booking-message" className="booking-form__wide">
        Notes
        <textarea
          id="event-booking-message"
          name="message"
          rows={4}
          placeholder="Tell us the occasion, setup needs, or preferred time."
        />
      </label>

      <button type="submit" className="primary-button booking-form__wide">
        Prepare Event Enquiry
      </button>

      {bookingHandoff ? (
        <motion.div
          className="booking-form__wide event-booking-form__message"
          role="status"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>{bookingHandoff.message}</p>
          <a href={bookingHandoff.whatsappUrl} className="secondary-button whatsapp-button" target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Send On WhatsApp
          </a>
        </motion.div>
      ) : null}
    </form>
  );
}

export function EventsPage() {
  return (
    <main className="page-shell events-page">
      <section className="page-section route-intro" aria-labelledby="events-title">
        <div className="route-container">
          <MotionReveal className="section-heading section-heading--compact" variant={blurIn}>
            <p className="route-eyebrow">Events</p>
            <h1 id="events-title">Events & Private Bookings</h1>
            <p>
              Host a countryside celebration, bring a group, or plan a public moment around
              Sekinchan's Boeing 727 landmark.
            </p>
          </MotionReveal>

          <MotionReveal className="hero-actions route-intro__actions" variant={fadeRight}>
            <Link to="/tickets" className="primary-button">
              Buy Tickets
            </Link>
            <a href="#event-booking" className="secondary-button">
              Enquire For Events
            </a>
            <Link to="/contact" className="ghost-button contact-actions__dark">
              Contact Details
            </Link>
          </MotionReveal>

          <MotionReveal className="section-heading section-heading--sub" variant={fadeLeft}>
            <p className="route-eyebrow">Private Bookings</p>
            <h2>Bring your group to the fields</h2>
            <p>Birthdays, team days, and venue hire with a memorable aircraft backdrop.</p>
          </MotionReveal>

          <StaggerGroup className="event-card-grid event-card-grid--overlay">
            {privateBookings.map((card, index) => (
              <StaggerItem key={card.id} index={index} asCard>
                <EventCard card={card} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <PhotoColumns
        eyebrow="Event Photos"
        title="Backdrops for groups and public moments"
        description="Use the photo columns to picture how birthdays, festivals, and group bookings can feel on site."
        photos={pagePhotoColumns.events}
        variant="grid"
        hidePhotoCaptions
        soft
      />

      <section className="page-section recognised-visits-section" aria-labelledby="recognised-visits-title">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={fadeRight}>
            <p className="route-eyebrow">Public Moments</p>
            <h2 id="recognised-visits-title">Recognised Visits & Public Moments</h2>
            <p>
              Official visits, tourism programmes, and public event highlights connected to
              Terminal Sekinchan.
            </p>
          </MotionReveal>

          <StaggerGroup className="royal-visit-gallery" aria-label="Selangor royal visit photos">
            {selangorRoyalVisitPhotos.map((photo, index) => (
              <StaggerItem key={photo.id} index={index} asCard>
                <figure className="royal-visit-photo">
                  <ResilientImage src={photo.image} alt={photo.alt} />
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <StaggerGroup className="recognised-visits-grid">
            {recognisedVisits.map((visit, index) => (
              <StaggerItem key={visit.id} index={index} asCard>
                <article className="recognised-visit-card">
                  <div className="recognised-visit-card__body">
                    <p className="route-eyebrow">{visit.label}</p>
                    <h3>{visit.title}</h3>
                    <p>{visit.description}</p>
                    <a href={visit.href} target="_blank" rel="noreferrer">
                      {visit.sourceLabel}
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <MotionReveal className="recognised-visits-section__cta" variant={fadeRight}>
            <Link to="/tickets" className="primary-button">
              Buy Tickets
            </Link>
            <a
              className="secondary-button"
              href="https://www.facebook.com/Terminal.Sekinchan"
              target="_blank"
              rel="noreferrer"
            >
              See More On Facebook
            </a>
          </MotionReveal>
        </div>
      </section>

      <section className="page-section event-booking-section" id="event-booking" aria-labelledby="event-booking-title">
        <div className="route-container event-booking-section__layout">
          <MotionReveal className="event-booking-section__intro" variant={fadeLeft}>
            <p className="route-eyebrow">Event Booking</p>
            <h2 id="event-booking-title">Plan your event at Terminal Sekinchan</h2>
            <p>
              Share the date, group size, and event type. We will help confirm availability,
              timing, and the best setup for your visit.
            </p>
          </MotionReveal>

          <MotionReveal variant={fadeRight}>
            <EventBookingForm />
          </MotionReveal>
        </div>
      </section>

      <section className="page-section" aria-label="Event enquiry photo">
        <div className="route-container">
          <MotionReveal className="photo-cta" variant={scaleIn}>
            <ResilientImage className="photo-cta__image" src={heroImages[2].src} alt={heroImages[2].alt} />
            <div className="photo-cta__scrim" aria-hidden="true" />
            <div className="photo-cta__content">
              <h2 className="photo-cta__title">Coming as a visitor?</h2>
              <Link to="/tickets" className="primary-button">
                Buy Tickets
              </Link>
              <a href="#event-booking" className="secondary-button">
                Planning A Group Event?
              </a>
            </div>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
