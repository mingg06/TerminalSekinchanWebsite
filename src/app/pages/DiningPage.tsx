import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router";
import { CalendarDays, Clock, Phone, Users } from "lucide-react";
import { PhotoColumns } from "../components/PhotoColumns";
import { contactDetails, pagePhotoColumns } from "../data/siteContent";
import {
  MotionReveal,
  fadeLeft,
  fadeRight,
  motion,
  useReducedMotion,
} from "../lib/motionPresets";

const restaurantName = "Dining at Terminal Sekinchan";
const openingTime = "09:00";
const closingTime = "20:00";
const maxGuests = 20;

function getDateInputValue(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function getTimeMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return Number.NaN;
  }

  return hours * 60 + minutes;
}

function getCurrentMinutes() {
  const now = new Date();

  return now.getHours() * 60 + now.getMinutes();
}

type ReservationErrors = Partial<{
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
}>;

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

export function DiningPage() {
  const today = useMemo(() => getDateInputValue(new Date()), []);
  const [reservationMessage, setReservationMessage] = useState("");
  const [reservationErrors, setReservationErrors] = useState<ReservationErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const date = String(formData.get("reservationDate") ?? "");
    const time = String(formData.get("reservationTime") ?? "");
    const guests = String(formData.get("guests") ?? "");
    const name = String(formData.get("guestName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const guestCount = Number.parseInt(guests, 10);
    const nextErrors: ReservationErrors = {};

    setReservationMessage("");

    if (!date) {
      nextErrors.date = "Choose a reservation date.";
    } else if (date < today) {
      nextErrors.date = "Choose today or a future date.";
    }

    const reservationTimeMinutes = getTimeMinutes(time);

    if (!time) {
      nextErrors.time = "Choose a reservation time.";
    } else if (!Number.isFinite(reservationTimeMinutes)) {
      nextErrors.time = "Enter a valid reservation time.";
    } else if (time < openingTime || time > closingTime) {
      nextErrors.time = "Choose a time from 09:00 to 20:00.";
    } else if (date === today && reservationTimeMinutes <= getCurrentMinutes()) {
      nextErrors.time = "Choose a time later than now, or pick another date.";
    }

    if (
      !guests.trim() ||
      !/^\d+$/.test(guests) ||
      guestCount < 1 ||
      guestCount > maxGuests
    ) {
      nextErrors.guests = `Enter 1 to ${maxGuests} guests.`;
    }

    if (!name) {
      nextErrors.name = "Enter your name.";
    }

    if (!phone) {
      nextErrors.phone = "Enter a phone number for confirmation.";
    }

    setReservationErrors(nextErrors);

    const firstErrorField = Object.keys(nextErrors)[0];

    if (firstErrorField) {
      const fieldName =
        firstErrorField === "date"
          ? "reservationDate"
          : firstErrorField === "time"
            ? "reservationTime"
            : firstErrorField === "name"
              ? "guestName"
              : firstErrorField;
      const field = event.currentTarget.elements.namedItem(fieldName);

      if (field instanceof HTMLElement) {
        field.focus();
      }

      return;
    }

    setReservationMessage(
      `Request prepared, not confirmed yet. ${name}, please call or WhatsApp to confirm your table for ${guestCount} guests on ${date} at ${time}. Callback phone: ${phone}.`
    );
  }

  return (
    <main className="page-shell dining-page">
      <section className="page-section route-intro dining-intro" aria-labelledby="dining-title">
        <div className="route-container">
          <MotionReveal className="section-heading section-heading--compact" variant={fadeLeft}>
            <p className="route-eyebrow">Restaurant</p>
            <h1 id="dining-title">{restaurantName}</h1>
            <p>
              A relaxed food stop at Terminal Sekinchan, made for easy family meals and
              photo breaks.
            </p>
          </MotionReveal>

          <MotionReveal className="hero-actions route-intro__actions" variant={fadeRight}>
            <Link to="/tickets" className="primary-button">
              Buy Tickets
            </Link>
            <a href={`tel:${contactDetails.phone}`} className="secondary-button">
              Call Restaurant
            </a>
            <a
              href={contactDetails.whatsappUrl}
              className="ghost-button contact-actions__dark"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Restaurant
            </a>
          </MotionReveal>
        </div>
      </section>

      <section
        className="page-section dining-reservation"
        id="dining-reservation"
        aria-labelledby="dining-reservation-title"
      >
        <div className="route-container dining-reservation__layout">
          <MotionReveal className="dining-reservation__intro" variant={fadeLeft}>
            <p className="route-eyebrow">Reservations</p>
            <h2 id="dining-reservation-title">Book a table</h2>
            <p>Send a quick request. The team will confirm by phone.</p>
            <p className="dining-reservation__phone">
              <Phone size={18} aria-hidden="true" />
              {contactDetails.phone}
            </p>
          </MotionReveal>

          <MotionReveal variant={fadeRight}>
          <form className="booking-form dining-reservation__form" onSubmit={handleSubmit} noValidate>
            <p className="booking-form__wide booking-form__hint">
              Fields marked required are required.
            </p>

            <label htmlFor="reservation-date">
              <span className="booking-form__label-text">
                Date <span className="booking-form__required">required</span>
              </span>
              <span className="booking-form__input-wrap">
                <CalendarDays size={17} aria-hidden="true" />
                <input
                  id="reservation-date"
                  name="reservationDate"
                  type="date"
                  min={today}
                  aria-invalid={reservationErrors.date ? "true" : undefined}
                  aria-describedby={
                    reservationErrors.date ? "reservation-date-error" : undefined
                  }
                  required
                />
              </span>
              {reservationErrors.date ? (
                <FormError id="reservation-date-error">{reservationErrors.date}</FormError>
              ) : null}
            </label>

            <label htmlFor="reservation-time">
              <span className="booking-form__label-text">
                Time <span className="booking-form__required">required</span>
              </span>
              <span className="booking-form__input-wrap">
                <Clock size={17} aria-hidden="true" />
                <input
                  id="reservation-time"
                  name="reservationTime"
                  type="time"
                  min={openingTime}
                  max={closingTime}
                  aria-invalid={reservationErrors.time ? "true" : undefined}
                  aria-describedby={`reservation-time-helper${
                    reservationErrors.time ? " reservation-time-error" : ""
                  }`}
                  required
                />
              </span>
              <span id="reservation-time-helper" className="booking-form__hint">
                Open 09:00 to 20:00.
              </span>
              {reservationErrors.time ? (
                <FormError id="reservation-time-error">{reservationErrors.time}</FormError>
              ) : null}
            </label>

            <label htmlFor="reservation-guests">
              <span className="booking-form__label-text">
                Number of guests <span className="booking-form__required">required</span>
              </span>
              <span className="booking-form__input-wrap">
                <Users size={17} aria-hidden="true" />
                <input
                  id="reservation-guests"
                  name="guests"
                  type="number"
                  min="1"
                  max={maxGuests}
                  step="1"
                  defaultValue="2"
                  aria-invalid={reservationErrors.guests ? "true" : undefined}
                  aria-describedby={`reservation-guests-helper${
                    reservationErrors.guests ? " reservation-guests-error" : ""
                  }`}
                  required
                />
              </span>
              <span id="reservation-guests-helper" className="booking-form__hint">
                Up to {maxGuests} guests per request.
              </span>
              {reservationErrors.guests ? (
                <FormError id="reservation-guests-error">{reservationErrors.guests}</FormError>
              ) : null}
            </label>

            <label htmlFor="reservation-name">
              <span className="booking-form__label-text">
                Name <span className="booking-form__required">required</span>
              </span>
              <input
                id="reservation-name"
                name="guestName"
                type="text"
                autoComplete="name"
                spellCheck={false}
                aria-invalid={reservationErrors.name ? "true" : undefined}
                aria-describedby={reservationErrors.name ? "reservation-name-error" : undefined}
                required
              />
              {reservationErrors.name ? (
                <FormError id="reservation-name-error">{reservationErrors.name}</FormError>
              ) : null}
            </label>

            <label htmlFor="reservation-phone">
              <span className="booking-form__label-text">
                Phone <span className="booking-form__required">required</span>
              </span>
              <input
                id="reservation-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                spellCheck={false}
                aria-invalid={reservationErrors.phone ? "true" : undefined}
                aria-describedby={reservationErrors.phone ? "reservation-phone-error" : undefined}
                required
              />
              {reservationErrors.phone ? (
                <FormError id="reservation-phone-error">{reservationErrors.phone}</FormError>
              ) : null}
            </label>

            <label htmlFor="reservation-notes" className="booking-form__wide">
              Notes
              <textarea
                id="reservation-notes"
                name="notes"
                rows={4}
                placeholder="High chair, birthday, or arrival note"
              />
            </label>

            <button type="submit" className="primary-button booking-form__wide">
              Reserve Table
            </button>

            {reservationMessage ? (
              <motion.p
                className="booking-form__wide dining-reservation__message"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {reservationMessage}
              </motion.p>
            ) : null}
          </form>
          </MotionReveal>
        </div>
      </section>

      <PhotoColumns
        eyebrow="Dining Photos"
        title="Plan food around the view"
        description="Add a meal stop between the plane, train ride, and paddy-field photos."
        photos={pagePhotoColumns.dining}
        variant="dining"
        hidePhotoCaptions
        soft
      />

      <section className="page-section" aria-label="Buy tickets after dining">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={fadeRight}>
            <p className="route-eyebrow">Next Step</p>
            <h2>Book the visit, then plan the meal</h2>
            <p>
              Lock in your train ride ticket first, then use the dining form if you want to reserve a table.
            </p>
            <div className="hero-actions route-intro__actions">
              <Link to="/tickets" className="primary-button">
                Buy Tickets
              </Link>
              <a href="#dining-reservation" className="secondary-button">
                Reserve Table
              </a>
            </div>
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
