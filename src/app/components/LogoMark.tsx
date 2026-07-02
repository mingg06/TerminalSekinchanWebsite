import logoCompact from "../../assets/terminal-sekinchan-logo.png";
import logoHorizontal from "../../assets/terminal-sekinchan-logo-horizontal.png";

type LogoMarkProps = {
  variant?: "horizontal" | "compact";
  className?: string;
};

export function LogoMark({ variant = "horizontal", className }: LogoMarkProps) {
  const isCompact = variant === "compact";

  return (
    <img
      src={isCompact ? logoCompact : logoHorizontal}
      alt="Terminal Sekinchan"
      className={className}
      style={{
        display: "block",
        width: isCompact ? 48 : 178,
        height: isCompact ? 48 : "auto",
        objectFit: "contain",
      }}
    />
  );
}
