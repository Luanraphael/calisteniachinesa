import type { CSSProperties, ReactNode } from "react";

/**
 * Parses inline markup shared by headlines and body copy:
 * `**pink**`, `++green++`, `##black bold##` (same color, heavier weight only),
 * `!!strong pink!!` (a perceptibly stronger grifo than `**`), and `\n` line breaks.
 */
export function parseRich(text: string): ReactNode[] {
  const lines = text.split("\n");
  const out: ReactNode[] = [];
  lines.forEach((line, li) => {
    if (li > 0) out.push(<br key={`br-${li}`} />);
    const parts = line.split(/(\*\*[^*]+\*\*|\+\+[^+]+\+\+|##[^#]+##|!!.+?!!)/g);
    parts.forEach((part, pi) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        out.push(
          <span key={`${li}-${pi}`} className="text-pink-strong">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part.startsWith("++") && part.endsWith("++")) {
        out.push(
          <span key={`${li}-${pi}`} className="text-success-strong">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part.startsWith("##") && part.endsWith("##")) {
        out.push(
          <span key={`${li}-${pi}`} className="font-extrabold">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part.startsWith("!!") && part.endsWith("!!")) {
        out.push(
          <span key={`${li}-${pi}`} className="font-black text-pink-strong">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part) {
        out.push(<span key={`${li}-${pi}`}>{part}</span>);
      }
    });
  });
  return out;
}

export function Headline({
  children,
  size = "md",
  center,
  className,
}: {
  children: string;
  size?: "sm" | "md" | "lg";
  center?: boolean;
  className?: string;
}) {
  const sizeClass =
    size === "lg"
      ? "text-[34px] leading-[1.06]"
      : size === "sm"
        ? "text-[26px] leading-[1.16]"
        : "text-[30px] leading-[1.08]";

  return (
    <h1
      className={`font-extrabold tracking-tight text-text text-balance ${sizeClass} ${center ? "text-center" : ""} ${className ?? ""}`}
    >
      {parseRich(children)}
    </h1>
  );
}

/** Body-copy paragraph with the same `**pink**` / `++green++` inline markup, at prose weight/size. */
export function RichText({
  children,
  className,
  style,
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p className={className} style={style}>
      {parseRich(children)}
    </p>
  );
}
