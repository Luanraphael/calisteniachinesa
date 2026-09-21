import type { ReactNode } from "react";

export function ScreenFooter({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 -mx-5 mt-auto flex flex-col gap-3 border-t border-border bg-bg/95 px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 backdrop-blur-sm">
      {children}
    </div>
  );
}
