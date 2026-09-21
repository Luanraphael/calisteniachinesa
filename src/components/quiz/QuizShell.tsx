import type { ReactNode } from "react";

export function QuizShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-bg">
      <div
        className="pointer-events-none fixed inset-0 hidden lg:block"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,43,138,0.08), transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,111,176,0.10), transparent 45%)",
        }}
      />
      {header}
      <main className="relative z-10 mx-auto flex w-full max-w-[520px] flex-1 flex-col px-5 pb-[max(env(safe-area-inset-bottom),1.5rem)]">
        {children}
      </main>
    </div>
  );
}
