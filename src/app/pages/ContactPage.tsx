import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import {
  contactDetails,
  faqs,
  planVisitItems,
  socialLinks,
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

const enquiryTypes = [
  "General enquiry",
  "Tickets enquiry",
  "Dining enquiry",
  "Birthday party",
  "Event booking",
  "Group visit",
];

const enquiryTypeBySearchParam: Record<string, string> = {
  birthday: "Birthday party",
  dining: "Dining enquiry",
  events: "Event booking",
  group: "Group visit",
  tickets: "Tickets enquiry",
};

const contactMapEmbedUrl =
  "https://www.google.com/maps?q=Terminal%20Sekinchan%20Ban%203%20Jalan%20Parit%205%2045400%20Sekinchan%20Selangor&z=14&output=embed";
const contactMapDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Terminal%20Sekinchan%20Ban%203%20Jalan%20Parit%205%2045400%20Sekinchan%20Selangor&travelmode=driving";

type EnquiryErrors = Partial<{
  name: string;
  phone: string;
  email: string;
  message: string;
}>;

type EnquiryHandoff = {
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

function getEnquiryTypeFromSearchParam(type: string | null) {
  if (!type) {
    return "General enquiry";
  }

  return enquiryTypeBySearchParam[type.toLowerCase()] ?? "General enquiry";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const defaultEnquiryType = useMemo(
    () => getEnquiryTypeFromSearchParam(searchParams.get("type")),
    [searchParams]
  );
  const [selectedEnquiryType, setSelectedEnquiryType] = useState(defaultEnquiryType);
  const [enquiryHandoff, setEnquiryHandoff] = useState<EnquiryHandoff | null>(null);
  const [enquiryErrors, setEnquiryErrors] = useState<EnquiryErrors>({});

  useEffect(() => {
    setSelectedEnquiryType(defaultEnquiryType);
  }, [defaultEnquiryType]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const enquiryType = String(formData.get("enquiryType") ?? "General enquiry");
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: EnquiryErrors = {};

    setEnquiryHandoff(null);

    if (!name) {
      nextErrors.name = "Enter your name.";
    }

    if (!phone) {
      nextErrors.phone = "Enter a phone number.";
    }

    if (email && !isValidEmail(email)) {
      nextErrors.email = "Enter a valid email address or leave it blank.";
    }

    if (!message) {
      nextErrors.message = "Tell us what you need.";
    }

    setEnquiryErrors(nextErrors);

    const firstErrorField = Object.keys(nextErrors)[0];

    if (firstErrorField) {
      const field = event.currentTarget.elements.namedItem(firstErrorField);

      if (field instanceof HTMLElement) {
        field.focus();
      }

      return;
    }

    setEnquiryHandoff({
      message: `Enquiry ready. ${name}, send it on WhatsApp to confirm your ${enquiryType.toLowerCase()}.`,
      whatsappUrl: createWhatsAppUrl(
        contactDetails.whatsappUrl,
        [
          `Hello Terminal Sekinchan, I would like to send an enquiry.`,
          `Type: ${enquiryType}`,
          `Name: ${name}`,
          `Phone: ${phone}`,
          email ? `Email: ${email}` : "",
          `Message: ${message}`,
        ]
          .filter(Boolean)
          .join("\n")
      ),
    });
    event.currentTarget.reset();
  }

  return (
    <main className="page-shell contact-page">
      <section className="page-section route-intro contact-overview" aria-labelledby="visit-title">
        <div className="route-container">
          <MotionReveal className="section-heading section-heading--compact" variant={blurIn}>
            <p className="route-eyebrow">Contact</p>
            <h1 id="visit-title">Contact & Plan Your Visit</h1>
            <p>
              Find Terminal Sekinchan, check opening hours, get directions, and prepare an
              enquiry before you visit.
            </p>
          </MotionReveal>

          <StaggerGroup className="contact-detail-grid">
            {planVisitItems.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="contact-detail-card__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2.4} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </span>
                </>
              );

              if (item.href) {
                return (
                  <StaggerItem key={item.id} index={index} asCard>
                    <a
                      className="contact-detail-card"
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  </StaggerItem>
                );
              }

              return (
                <StaggerItem key={item.id} index={index} asCard>
                  <div className="contact-detail-card">
                    {content}
                  </div>
                </StaggerItem>
              );
            })}

          </StaggerGroup>

          <MotionReveal className="contact-actions" variant={fadeRight}>
            <a className="primary-button" href={contactDetails.mapUrl} target="_blank" rel="noreferrer">
              <MapPin size={18} aria-hidden="true" />
              Get Directions
            </a>
            <Link to="/tickets" className="secondary-button">
              Buy Tickets
            </Link>
            <a className="secondary-button whatsapp-button" href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
          </MotionReveal>
        </div>
      </section>

      <section className="page-section page-section--soft contact-enquiry" aria-labelledby="enquiry-title">
        <div className="route-container">
          <MotionReveal className="contact-location-map nearby-map" aria-label="Terminal Sekinchan location map" variant={scaleIn}>
            <div className="nearby-map__canvas-shell">
              <div className="nearby-map__google-frame">
                <iframe
                  title="Google map showing Terminal Sekinchan"
                  src={contactMapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="nearby-map__map-actions" aria-label="Map actions">
                <a href={contactDetails.mapUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} strokeWidth={2.4} />
                  Open Google Maps
                </a>
                <a href={contactMapDirectionsUrl} target="_blank" rel="noreferrer">
                  <Navigation size={16} strokeWidth={2.4} />
                  Get Route
                </a>
              </div>
            </div>
          </MotionReveal>

          <div className="contact-enquiry__layout">
            <MotionReveal className="contact-enquiry__intro" variant={fadeLeft}>
              <p className="route-eyebrow">Enquiry</p>
              <h2 id="enquiry-title">Send a quick request</h2>
              <p>Share your visit or event details, then call or WhatsApp to confirm.</p>
              <div className="contact-enquiry__links" aria-label="Direct contact links">
                <a href={`tel:${contactDetails.phone}`}>
                  <Phone size={18} aria-hidden="true" />
                  {contactDetails.phone}
                </a>
                <a href="mailto:hello@terminalsekinchan.com">
                  <Mail size={18} aria-hidden="true" />
                  hello@terminalsekinchan.com
                </a>
              </div>
            </MotionReveal>

            <MotionReveal variant={fadeRight}>
            <form className="booking-form contact-form" onSubmit={handleSubmit} noValidate>
            <p className="booking-form__wide booking-form__hint">
              Fields marked required are required.
            </p>

            <label htmlFor="enquiry-type">
              Enquiry type
              <select
                id="enquiry-type"
                name="enquiryType"
                value={selectedEnquiryType}
                onChange={(event) => {
                  setSelectedEnquiryType(event.target.value);
                  setEnquiryHandoff(null);
                }}
              >
                {enquiryTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>

            <label htmlFor="contact-name">
              <span className="booking-form__label-text">
                Name <span className="booking-form__required">required</span>
              </span>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                spellCheck={false}
                aria-invalid={enquiryErrors.name ? "true" : undefined}
                aria-describedby={enquiryErrors.name ? "contact-name-error" : undefined}
                required
              />
              {enquiryErrors.name ? (
                <FormError id="contact-name-error">{enquiryErrors.name}</FormError>
              ) : null}
            </label>

            <label htmlFor="contact-phone">
              <span className="booking-form__label-text">
                Phone <span className="booking-form__required">required</span>
              </span>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                spellCheck={false}
                aria-invalid={enquiryErrors.phone ? "true" : undefined}
                aria-describedby={enquiryErrors.phone ? "contact-phone-error" : undefined}
                required
              />
              {enquiryErrors.phone ? (
                <FormError id="contact-phone-error">{enquiryErrors.phone}</FormError>
              ) : null}
            </label>

            <label htmlFor="contact-email" className="booking-form__wide">
              Email
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="you@example.com"
                aria-invalid={enquiryErrors.email ? "true" : undefined}
                aria-describedby={enquiryErrors.email ? "contact-email-error" : undefined}
              />
              {enquiryErrors.email ? (
                <FormError id="contact-email-error">{enquiryErrors.email}</FormError>
              ) : null}
            </label>

            <label htmlFor="contact-message" className="booking-form__wide">
              <span className="booking-form__label-text">
                Message <span className="booking-form__required">required</span>
              </span>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                aria-invalid={enquiryErrors.message ? "true" : undefined}
                aria-describedby={enquiryErrors.message ? "contact-message-error" : undefined}
                required
              />
              {enquiryErrors.message ? (
                <FormError id="contact-message-error">{enquiryErrors.message}</FormError>
              ) : null}
            </label>

            <button type="submit" className="primary-button booking-form__wide">
              Prepare Enquiry
            </button>

            {enquiryHandoff ? (
              <motion.div
                className="booking-form__wide contact-form__message"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>{enquiryHandoff.message}</p>
                <a href={enquiryHandoff.whatsappUrl} className="secondary-button whatsapp-button" target="_blank" rel="noreferrer">
                  Send On WhatsApp
                </a>
              </motion.div>
            ) : null}
            </form>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="faq-title">
        <div className="route-container contact-faq-layout">
          <MotionReveal variant={fadeLeft}>
            <p className="route-eyebrow">FAQs</p>
            <h2 id="faq-title">Before you go</h2>
          </MotionReveal>

          <StaggerGroup className="faq-list">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;

              return (
                <StaggerItem key={faq.question} index={index} asCard>
                  <details className="faq-item">
                    <summary>
                      <span className="faq-item__icon" aria-hidden="true">
                        <Icon size={17} strokeWidth={2.4} />
                      </span>
                      {faq.question}
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <section className="page-section page-section--deep" aria-label="Social links">
        <MotionReveal className="route-container contact-social" variant={blurIn}>
          <h2>Follow Terminal Sekinchan</h2>
          <div className="contact-social__links">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  <Icon size={18} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
          <Link to="/events" className="secondary-button">
            View Events
          </Link>
          <Link to="/tickets" className="primary-button">
            Buy Tickets
          </Link>
        </MotionReveal>
      </section>
    </main>
  );
}
