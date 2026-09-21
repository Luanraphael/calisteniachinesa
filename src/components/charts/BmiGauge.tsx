"use client";

import { motion } from "framer-motion";
import { bmiGaugePosition, BMI_CATEGORY_LABEL, bmiCategory } from "@/lib/bmi";

export function BmiGauge({ bmi }: { bmi: number }) {
  const pos = bmiGaugePosition(bmi);
  const category = bmiCategory(bmi);

  return (
    <div className="w-full">
      <div className="relative mb-3 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="rounded-full bg-text px-3 py-1.5 text-xs font-bold text-white shadow-md"
          style={{ position: "absolute", left: `${pos}%`, transform: "translateX(-50%)", top: -6, whiteSpace: "nowrap" }}
        >
          Seu IMC: {bmi.toFixed(1)}
        </motion.div>
      </div>

      <div className="relative mt-9 h-3 w-full overflow-hidden rounded-full">
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
