"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ImageSlot } from "@/lib/quizTypes";

const ASPECT: Partial<Record<ImageSlot["variant"], string>> = {
  full: "aspect-[4/3]",
  side: "aspect-[3/4]",
  mockup: "aspect-[16/10]",
  circle: "aspect-square rounded-full",
  portrait: "aspect-[4/5]",
};

const SIZES: Partial<Record<ImageSlot["variant"], string>> = {
  full: "(max-width: 520px) 100vw, 480px",
  side: "(max-width: 520px) 45vw, 220px",
  mockup: "(max-width: 520px) 100vw, 480px",
  circle: "120px",
  portrait: "(max-width: 520px) 100vw, 480px",
};

/** Full-body cutouts (side/mockup/portrait) must never crop hands, feet, head or hair. */
const FIT: Partial<Record<ImageSlot["variant"], "cover" | "contain">> = {
  full: "cover",
  side: "contain",
  mockup: "contain",
  circle: "cover",
  portrait: "contain",
};

export function ImagePlaceholder({ slot, className, priority }: { slot: ImageSlot; className?: string; priority?: boolean }) {
  if (slot.src) {
    // Renders the asset exactly as provided — no forced aspect ratio, no background
    // fill behind letterboxed edges, no rounded-corner frame.
    if (slot.variant === "natural") {
      return (
        <Image
          src={slot.src}
          alt={slot.alt}
          width={slot.naturalWidth ?? 1000}
          height={slot.naturalHeight ?? 1000}
          className={`h-auto w-full ${className ?? ""}`}
          priority={priority}
        />
      );
    }

    return (
      <div className={`relative w-full overflow-hidden rounded-2xl bg-[#faf6f8] ${ASPECT[slot.variant]} ${className ?? ""}`}>
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          style={{ objectFit: FIT[slot.variant], objectPosition: slot.variant === "full" ? "center 20%" : "center top" }}
          sizes={SIZES[slot.variant]}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-border-strong bg-[#faf6f8] text-center ${ASPECT[slot.variant]} ${className ?? ""}`}
      role="img"
      aria-label={slot.alt}
    >
      <ImageIcon size={22} className="text-ink-faint opacity-60" strokeWidth={1.5} />
      <span className="px-4 text-[11.5px] font-semibold leading-snug text-text-tertiary">{slot.alt}</span>
      <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] text-text-tertiary shadow-xs">
        {slot.key}
      </span>
    </div>
  );
}
