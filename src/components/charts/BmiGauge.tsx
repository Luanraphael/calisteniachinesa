"use client";

import { motion } from "framer-motion";
import { bmiGaugePosition, BMI_CATEGORY_LABEL, bmiCategory } from "@/lib/bmi";

export function BmiGauge({ bmi }: { bmi: number }) {
  const pos = bmiGaugePosition(bmi);
  const category = bmiCategory(bmi);

  return (
    <div className="w-full">
      {/* Reserves real vertical space for the pill (it used to be a negative-offset
          absolute child of a zero-height container, which let it drift down and
          overlap the gauge bar/dot below for BMI values near the gauge's edges). */}
      <div className="relative h-10 w-full">
        {/* Plain element owns the horizontal centering transform. Framer Motion takes
            full ownership of the `transform` CSS property on any element whose animate
            props include `y` (or x/scale/rotate) — a static translateX(-50%) set via
            style on that same motion.div gets silently overwritten by its y-animation,
            which is exactly why the pill used to drift and overlap instead of centering
            on its clamped left position. Nesting the animated fade-in inside a plain,
            statically-positioned wrapper keeps the two transforms from fighting. */}
        <div
          className="absolute bottom-0 z-10"
          style={{
            // A percentage-only clamp assumes a fixed pill width, but "Seu IMC: X" grows
            // with the number of digits — mixing px and % in clamp() keeps the pill's
            // edge a fixed safe distance from the container's edge no matter the text
            // length or the viewport width, instead of guessing a percentage that only
            // happens to work for one BMI value.
            left: `clamp(72px, ${pos}%, calc(100% - 72px))`,
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="whitespace-nowrap rounded-full bg-text px-3 py-1.5 text-xs font-bold text-white shadow-md"
          >
            Seu IMC: {bmi.toFixed(1)}
          </motion.div>
        </div>
      </div>

      <div className="relative mt-2 h-3 w-full overflow-hidden rounded-full">
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, #7cc9a8 0%, #d9c86b 32%, #e8a05a 62%, #d1445a 100%)",
          }}
        />
      </div>

      <motion.div
        className="relative -mt-[7px] h-4 w-4 rounded-full border-[3px] border-white bg-text shadow"
        initial={{ left: "2%" }}
        animate={{ left: `${pos}%` }}
        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform: "translateX(-50%)" }}
      />

      <div className="mt-2 flex justify-between text-[11px] font-medium text-text-secondary">
        {(Object.keys(BMI_CATEGORY_LABEL) as Array<keyof typeof BMI_CATEGORY_LABEL>).map((key) => (
          <span key={key} className={category === key ? "font-bold text-text" : ""}>
            {BMI_CATEGORY_LABEL[key]}
          </span>
        ))}
      </div>
    </div>
  );
}
