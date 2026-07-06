import { useTheme } from "@/lib/theme";
import { trackEvent } from "@/lib/analytics";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={() => {
        toggle();
        trackEvent("theme_toggle", { to: theme === "dark" ? "light" : "dark" });
      }}
      aria-label="Toggle theme"
      className="relative w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-surface transition group"
    >
      <span className="text-mono text-[0.65rem]">
        {theme === "dark" ? "☾" : "☀"}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
