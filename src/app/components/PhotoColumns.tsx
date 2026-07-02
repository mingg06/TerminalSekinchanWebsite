import { ResilientImage } from "./ResilientImage";
import {
  MotionReveal,
  StaggerGroup,
  StaggerItem,
  blurIn,
} from "../lib/motionPresets";

export type PhotoColumnItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

type PhotoColumnsProps = {
  eyebrow: string;
  title: string;
  description?: string;
  photos: PhotoColumnItem[];
  hidePhotoCaptions?: boolean;
  hidePhotoDescriptions?: boolean;
  plain?: boolean;
  soft?: boolean;
  variant?: "grid" | "mosaic" | "editorial" | "panorama" | "postcard" | "timeline" | "dining" | "carousel";
};

export function PhotoColumns({
  eyebrow,
  title,
  description,
  photos,
  hidePhotoCaptions = false,
  hidePhotoDescriptions = false,
  plain = false,
  soft = false,
  variant = "grid",
}: PhotoColumnsProps) {
  return (
    <section
      id={`${photos[0]?.id ?? "photo"}-columns`}
      className={`page-section photo-columns-section${soft ? " page-section--soft" : ""}`}
      data-photo-variant={variant}
      data-photo-captions={hidePhotoCaptions ? "hidden" : undefined}
      data-photo-plain={plain ? "true" : undefined}
      aria-labelledby={`${photos[0]?.id ?? "photo"}-columns-title`}
    >
      <div className="route-container">
        {plain || variant === "carousel" ? (
          <h2 id={`${photos[0]?.id ?? "photo"}-columns-title`} className="sr-only">
            {title}
          </h2>
        ) : (
          <MotionReveal className="section-heading" variant={blurIn}>
            <p className="route-eyebrow">{eyebrow}</p>
            <h2 id={`${photos[0]?.id ?? "photo"}-columns-title`}>{title}</h2>
            {description ? <p>{description}</p> : null}
          </MotionReveal>
        )}

        {variant === "carousel" ? (
          <div className="photo-carousel-tabs" aria-hidden="true">
            <span className="photo-carousel-tabs__pill photo-carousel-tabs__pill--active">
              Photo Album
            </span>
            <span className="photo-carousel-tabs__pill">
              Visit Moments
            </span>
          </div>
        ) : null}

        <StaggerGroup className="photo-columns-grid" amount={0.22}>
          {photos.map((photo, index) => (
            <StaggerItem key={photo.id} index={index} asCard>
              <figure className="photo-column-card">
                <ResilientImage src={photo.image} alt={photo.alt} />
                {plain || hidePhotoCaptions ? null : (
                  <figcaption>
                    <strong>{photo.title}</strong>
                    {hidePhotoDescriptions ? null : <span>{photo.description}</span>}
                  </figcaption>
                )}
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {variant === "carousel" ? (
          <div className="photo-carousel-dots" aria-hidden="true">
            {photos.map((photo, index) => (
              <span
                key={photo.id}
                className="photo-carousel-dots__dot"
                data-active={index === 0 ? "true" : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
