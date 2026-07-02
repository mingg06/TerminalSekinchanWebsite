import { ImgHTMLAttributes, useState } from "react";
import terminalSekinchanHeroImage from "../../assets/terminal-sekinchan-hero-generated.png";

type ResilientImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function ResilientImage({
  alt,
  fallbackSrc = terminalSekinchanHeroImage,
  onError,
  src,
  ...props
}: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        onError?.(event);

        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
