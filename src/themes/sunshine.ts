import { Theme } from "../types/theme";

export const sunshine: Theme = {
  name: "Sunshine",
  vars: {
    /* Backgrounds */
    "--bg": "#FFFFFF", // clean daylight
    "--board-bg": "#FFF9F2", // warm paper glow
    "--card": "#FFFFFF", // crisp cards

    /* Text */
    "--text": "#3A2B1F", // warm espresso
    "--text-muted": "#8A6A55", // gentle brown

    /* Accents (sunrise energy) */
    "--accent": "#FF6B35", // cheerful orange
    "--accent-soft": "#FF9F1C", // sunny amber

    /* UI */
    "--radius": "16px",
    "--divider": "rgba(255, 107, 53, 0.22)",

    /* Typography */
    "--font-body":
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',

    /* ───────── calendar (bright + encouraging) ───────── */
    "--calendar-day-bg": "#FFFFFF",
    "--calendar-day-bg-muted": "#FFF1E6", // faded sun days
    "--calendar-task-bg": "#FFE3D1", // soft peach task pills
    "--calendar-hover": "rgba(255, 107, 53, 0.12)", // warm glow
  },
};
