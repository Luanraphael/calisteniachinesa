"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ImageSlot } from "@/lib/quizTypes";

/**
 * The persona figure for side-by-side "interactive" steps (experience, lastProud,
 * flexibility, injuries...). This is NOT a thumbnail/card — it must never carry a
 * background, border, radius, padding, or be stretched/cropped to match the options
 * column's height. It renders at its real, natural proportions (intrinsic aspect ratio)
 * scaled only by the column's width, top-aligned with the headline/options — exactly
 * like a piece of the page composition, not content dropped into a slot.
 */
export function InteractiveFigure({ slot }: { slot: ImageSlot }) {
  if (!slot.src) {
    return (
      <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border-strong bg-[#faf6f8] p-3 text-center">
        <ImageIcon size={20} className="text-ink-faint opacity-60" strokeWidth={1.5} />
        <span className="text-[10.5px] font-semibold leading-snug text-text-tertiary">{slot.alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={slot.src}
      alt={slot.alt}
      width={941}
      height={1672}
      className="block h-auto w-full"
      sizes="(max-width: 520px) 45vw, 220px"
    />
  );
}
