import { Newspaper, Share2 } from "lucide-react";

/**
 * Stylised "editorial mention" card — a generic, clearly-fictional press
 * mockup (no real outlet name/logo) that mirrors the reference funnel's
 * trust-building screenshot without impersonating any publication.
 */
export function ArticleCard({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
      <div className="flex items-center gap-2 border-b border-border bg-[#faf7f8] px-4 py-2.5">
        <Newspaper size={14} className="text-text-tertiary" />
        <span className="text-[10.5px] font-extrabold uppercase tracking-wide text-text-tertiary">{eyebrow}</span>
      </div>
      <div className="px-4 py-4">
        <p className="text-[14.5px] font-extrabold leading-snug text-text">{title}</p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-text-secondary">{body}</p>
      </div>
      <div className="flex items-center gap-2 border-t border-border px-4 py-2.5">
        <Share2 size={13} className="text-text-tertiary" />
        <span className="text-[11px] font-semibold text-text-tertiary">Conteúdo educativo ilustrativo</span>
      </div>
    </div>
  );
}
