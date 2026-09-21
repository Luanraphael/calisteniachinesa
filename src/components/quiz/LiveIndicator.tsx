/** "Active now" status dot — a small pulsing green core inside a soft halo. Never reuse this for checkboxes/badges. */
export function LiveIndicator() {
  return (
    <span className="relative inline-grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full" style={{ background: "rgba(52,168,83,0.18)" }}>
      <span className="absolute inset-0 rounded-full" style={{ background: "rgba(52,168,83,0.35)", animation: "live-pulse 2.2s ease-out infinite" }} />
      <span className="relative h-[7px] w-[7px] rounded-full" style={{ background: "var(--color-success-strong)" }} />
    </span>
  );
}
