import { FormEvent, useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock, MapPin, MessageCircle, Ticket, Users } from "lucide-react";
import { PhotoColumns } from "../components/PhotoColumns";
import { contactDetails, pagePhotoColumns, ticketCategories } from "../data/siteContent";
import { createWhatsAppUrl } from "../lib/whatsapp";
import {
  MotionReveal,
  StaggerGroup,
  StaggerItem,
  fadeLeft,
  fadeRight,
  motion,
  useReducedMotion,
} from "../lib/motionPresets";

const timeSlots = ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00"];
const maxQuantity = 20;

type BookingHandoff = {
  message: string;
  whatsappUrl: string;
};

function getDateInputValue(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function getTomorrowInputValue() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return getDateInputValue(tomorrow);
}

function getTodayInputValue() {
  return getDateInputValue(new Date());
}

function getCurrentMinutes() {
  const now = new Date();

  return now.getHours() * 60 + now.getMinutes();
}

function getSlotMinutes(slot: string) {
  const [hours, minutes] = slot.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatCurrency(value: number) {
  return `RM${value.toLocaleString("en-MY")}`;
}

function getAvailableTimeSlots(visitDate: string, today: string) {
  if (visitDate !== today) {
    return timeSlots;
  }

  const currentMinutes = getCurrentMinutes();

  return timeSlots.filter((slot) => getSlotMinutes(slot) > currentMinutes);
}

function getQuantityError(value: string) {
  if (!/^\d+$/.test(value)) {
    return `Enter a quantity from 1 to ${maxQuantity}.`;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (parsedValue < 1) {
    return "Quantity must be at least 1.";
  }

  if (parsedValue > maxQuantity) {
    return `Quantity cannot exceed ${maxQuantity}.`;
  }

  return "";
}

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

export function TicketsPage() {
  const today = useMemo(() => getTodayInputValue(), []);
  const initialVisitDate = useMemo(
    () => (getAvailableTimeSlots(today, today).length > 0 ? today : getTomorrowInputValue()),
    [today]
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(ticketCategories[0].id);
  const [quantity, setQuantity] = useState("1");
  const [visitDate, setVisitDate] = useState(initialVisitDate);
  const [visitTime, setVisitTime] = useState(
    () => getAvailableTimeSlots(initialVisitDate, today)[0] ?? ""
  );
  const [bookingHandoff, setBookingHandoff] = useState<BookingHandoff | null>(null);
  const [timeError, setTimeError] = useState("");
  const [availabilityCheck, setAvailabilityCheck] = useState(0);

  const selectedCategory =
    ticketCategories.find((category) => category.id === selectedCategoryId) ?? ticketCategories[0];
  const availableTimeSlots = useMemo(
    () => getAvailableTimeSlots(visitDate, today),
    [availabilityCheck, visitDate, today]
  );
  const noAvailableTimes = availableTimeSlots.length === 0;
  const quantityError = getQuantityError(quantity);
  const bookingQuantity = quantityError ? 0 : Number.parseInt(quantity, 10);
  const subtotal = selectedCategory.price * bookingQuantity;

  useEffect(() => {
    if (availableTimeSlots.length > 0 && !availableTimeSlots.includes(visitTime)) {
      setVisitTime(availableTimeSlots[0]);
    }

    if (availableTimeSlots.length === 0 && visitTime) {
      setVisitTime("");
    }
  }, [availableTimeSlots, visitTime]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTimeError("");
    setAvailabilityCheck((check) => check + 1);

    const currentToday = getTodayInputValue();
    const currentAvailableTimeSlots = getAvailableTimeSlots(visitDate, currentToday);

    if (visitDate === currentToday && !currentAvailableTimeSlots.includes(visitTime)) {
      if (currentAvailableTimeSlots.length > 0) {
        setVisitTime(currentAvailableTimeSlots[0]);
        setTimeError("That ride time has passed. Choose another time or date to continue.");
      } else {
        setVisitTime("");
        setTimeError("Today's train rides have finished. Choose another date to continue.");
      }

      return;
    }

    if (quantityError || noAvailableTimes || !visitTime) {
      return;
    }

    const requestSummary = `${bookingQuantity} x ${selectedCategory.name} ticket request for ${visitDate} at ${visitTime}. Subtotal: ${formatCurrency(subtotal)}.`;

    setBookingHandoff({
      message: `Ticket request ready. Send it to Terminal Sekinchan on WhatsApp to confirm availability and payment.`,
      whatsappUrl: createWhatsAppUrl(
        contactDetails.whatsappUrl,
        `Hello Terminal Sekinchan, I would like to confirm a train ride ticket request: ${requestSummary}`
      ),
    });
  }

  return (
    <main className="page-shell tickets-page">
      <section
        className="page-section route-intro ticket-booking"
        id="ticket-booking"
        aria-labelledby="tickets-title"
      >
        <div className="route-container ticket-booking__layout">
          <MotionReveal className="ticket-booking__intro" variant={fadeLeft}>
            <p className="route-eyebrow">Train Ride Tickets</p>
            <h1 id="tickets-title">Buy Train Ride Tickets</h1>
            <p>
              Choose your paddy field train ride category, date, time, and quantity. The site
              prepares your request for WhatsApp confirmation with the Terminal Sekinchan team.
            </p>
          </MotionReveal>

          <MotionReveal variant={fadeRight}>
          <form className="booking-form ticket-booking__form" onSubmit={handleSubmit}>
            <fieldset className="booking-form__wide ticket-category-fieldset">
              <legend>Ticket category</legend>
              <StaggerGroup className="ticket-category-grid">
                {ticketCategories.map((category, index) => {
                  const Icon = category.icon;

                  return (
                    <StaggerItem key={category.id} index={index}>
                      <label
                        className="ticket-category-option"
                        data-selected={selectedCategoryId === category.id}
                      >
                        <input
                          type="radio"
                          name="ticketCategory"
                          value={category.id}
                          checked={selectedCategoryId === category.id}
                          onChange={(event) => {
                            setSelectedCategoryId(event.target.value);
                            setBookingHandoff(null);
                          }}
                        />
                        <span className="ticket-category-option__content">
                          <span className="ticket-category-option__topline">
                            <span className="ticket-category-option__icon" aria-hidden="true">
                              <Icon size={17} strokeWidth={2.4} />
                            </span>
                            {category.featured ? (
                              <span className="ticket-category-option__badge">Best value</span>
                            ) : null}
                          </span>
                          <span className="ticket-category-option__name">{category.name}</span>
                          <span
                            className="ticket-category-option__price"
                            aria-label={
                              category.originalPrice
                                ? `Original price ${formatCurrency(
                                    category.originalPrice
                                  )}, now ${formatCurrency(category.price)} per ${category.unit}`
                                : undefined
                            }
                          >
                            {category.originalPrice ? (
                              <span className="ticket-category-option__original" aria-hidden="true">
                                {formatCurrency(category.originalPrice)}
                              </span>
                            ) : null}
                            <strong>{formatCurrency(category.price)}</strong>
                            <span> / {category.unit}</span>
                          </span>
                          <span className="ticket-category-option__description">
                            {category.description}
                          </span>
                        </span>
                      </label>
                    </StaggerItem>
                  );
                })}
              </StaggerGroup>
            </fieldset>

            <label htmlFor="ticket-quantity">
              Quantity
              <span className="booking-form__input-wrap">
                <Users size={17} aria-hidden="true" />
                <input
                  id="ticket-quantity"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={quantity}
                  onChange={(event) => {
                    const nextValue = event.target.value;

                    if (/^\d*$/.test(nextValue)) {
                      setQuantity(nextValue);
                      setBookingHandoff(null);
                    }
                  }}
                  aria-invalid={quantityError ? "true" : undefined}
                  aria-describedby={quantityError ? "ticket-quantity-error" : undefined}
                  required
                />
              </span>
              {quantityError ? (
                <FormError id="ticket-quantity-error">{quantityError}</FormError>
              ) : null}
            </label>

            <label htmlFor="ticket-date">
              Visit date
              <span className="booking-form__input-wrap">
                <CalendarDays size={17} aria-hidden="true" />
                <input
                  id="ticket-date"
                  type="date"
                  min={today}
                  value={visitDate}
                  onChange={(event) => {
                    setVisitDate(event.target.value);
                    setBookingHandoff(null);
                    setTimeError("");
                  }}
                  required
                />
              </span>
            </label>

            <label htmlFor="ticket-time">
              Ride time
              <span className="booking-form__input-wrap">
                <Clock size={17} aria-hidden="true" />
                <select
                  id="ticket-time"
                  value={visitTime}
                  onChange={(event) => {
                    setVisitTime(event.target.value);
                    setBookingHandoff(null);
                    setTimeError("");
                  }}
                  disabled={noAvailableTimes}
                  aria-describedby={
                    noAvailableTimes || timeError ? "ticket-time-unavailable" : undefined
                  }
                  aria-invalid={timeError ? "true" : undefined}
                  required
                >
                  {noAvailableTimes ? (
                    <option value="">No ride times available today</option>
                  ) : null}
                  {timeSlots.map((slot) => (
                    <option
                      key={slot}
                      value={slot}
                      disabled={visitDate === today && !availableTimeSlots.includes(slot)}
                    >
                      {slot}
                    </option>
                  ))}
                </select>
              </span>
              {noAvailableTimes || timeError ? (
                <FormError id="ticket-time-unavailable">
                  {timeError || "Today's train rides have finished. Choose another date to continue."}
                </FormError>
              ) : null}
            </label>

            <div className="ticket-booking__summary" aria-live="polite">
              <div>
                <span className="ticket-booking__summary-label">Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <p>
                {bookingQuantity} x {selectedCategory.name}
              </p>
            </div>

            <button
              type="submit"
              className="primary-button booking-form__wide"
              disabled={Boolean(quantityError) || noAvailableTimes}
            >
              <Ticket size={18} aria-hidden="true" />
              Prepare Ticket Request
            </button>

            {bookingHandoff ? (
              <motion.div
                className="booking-form__wide ticket-booking__message"
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>{bookingHandoff.message}</p>
                <a href={bookingHandoff.whatsappUrl} className="secondary-button whatsapp-button" target="_blank" rel="noreferrer">
                  Confirm On WhatsApp
                </a>
              </motion.div>
            ) : null}
          </form>
          </MotionReveal>
        </div>
      </section>

      <PhotoColumns
        eyebrow="Ride Photos"
        title="What you are booking"
        description="The ticket request is for a short, visual paddy-field ride designed for families and groups."
        photos={pagePhotoColumns.tickets}
        variant="panorama"
        hidePhotoCaptions
        soft
      />

      <section className="page-section page-section--soft" aria-labelledby="ticket-help-title">
        <div className="route-container">
          <MotionReveal className="section-heading" variant={fadeLeft}>
            <p className="route-eyebrow">Before You Go</p>
            <h2 id="ticket-help-title">Useful details after choosing tickets</h2>
            <p>
              Keep these details nearby while the team confirms your ticket request on WhatsApp.
            </p>
          </MotionReveal>

          <StaggerGroup className="feature-grid">
            <StaggerItem asCard>
              <article className="feature-card">
                <span className="feature-card__icon" aria-hidden="true">
                  <Clock size={18} strokeWidth={2.4} />
                </span>
                <h3>Opening hours</h3>
                <p>{contactDetails.openingHours}</p>
              </article>
            </StaggerItem>
            <StaggerItem asCard index={1}>
              <article className="feature-card">
                <span className="feature-card__icon" aria-hidden="true">
                  <MapPin size={18} strokeWidth={2.4} />
                </span>
                <h3>Location</h3>
                <p>{contactDetails.address}</p>
                <a href={contactDetails.mapUrl} target="_blank" rel="noreferrer">
                  Open Map
                </a>
              </article>
            </StaggerItem>
            <StaggerItem asCard index={2}>
              <article className="feature-card">
                <span className="feature-card__icon" aria-hidden="true">
                  <MessageCircle size={18} strokeWidth={2.4} />
                </span>
                <h3>Need help?</h3>
                <p>Message the team if you need to check timing, group size, or ticket availability.</p>
                <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </article>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
