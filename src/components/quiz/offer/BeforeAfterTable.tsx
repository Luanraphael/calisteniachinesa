"use client";

import { motion } from "framer-motion";

const ROWS = [
  { label: "Energia diária", before: "Acaba no meio da tarde", after: "Dura o dia todo" },
  { label: "Dores no corpo", before: "Acorda travada", after: "Corpo leve e sem dor" },
  { label: "Disposição", before: "Abaixo do normal", after: "Acima do normal" },
  { label: "Força e tônus", before: "Corpo mole e sem firmeza", after: "Corpo firme e tonificado" },
  { label: "Clareza mental", before: "Explode fácil", after: "Tranquilidade e foco" },
];

export function BeforeAfterTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="grid grid-cols-[1fr_1fr_1fr] bg-text text-white">
        <div className="px-3 py-2.5 text-[11px] font-bold" />
        <div className="px-3 py-2.5 text-center text-[11px] font-extrabold tracking-wide text-white/70">ANTES</div>
        <div className="px-3 py-2.5 text-center text-[11px] font-extrabold tracking-wide" style={{ color: "#7fe0a0" }}>DEPOIS</div>
      </div>
      {ROWS.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className={`grid grid-cols-[1fr_1fr_1fr] items-center ${i % 2 ? "bg-pink-wash" : "bg-surface"}`}
        >
          <div className="px-3 py-3 text-[12.5px] font-bold text-text">{row.label}</div>
          <div className="px-2 py-3 text-center text-[11.5px] text-danger/80">{row.before}</div>
          <div className="px-2 py-3 text-center text-[11.5px] font-semibold text-success">{row.after}</div>
        </motion.div>
      ))}
    </div>
  );
}
