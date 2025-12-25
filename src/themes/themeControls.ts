export type ThemeControl = {
  key: string;
  label: string;
  type: "color" | "range" | "text" | "select";
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
};

export const themeControls: {
  section: string;
  controls: ThemeControl[];
}[] = [
  {
    section: "Backgrounds",
    controls: [
      { key: "--bg", label: "App background", type: "color" },
      { key: "--board-bg", label: "Board background", type: "color" },
      { key: "--card", label: "Card background", type: "color" },
    ],
  },
  {
    section: "Text",
    controls: [
      { key: "--text", label: "Primary text", type: "color" },
      { key: "--text-muted", label: "Muted text", type: "color" },
    ],
  },
  {
    section: "Accent",
    controls: [
      { key: "--accent", label: "Accent", type: "color" },
      { key: "--accent-soft", label: "Accent soft", type: "color" },
    ],
  },
  {
    section: "UI",
    controls: [
      {
        key: "--radius",
        label: "Corner radius",
        type: "range",
        min: 4,
        max: 24,
        step: 1,
      },
      { key: "--divider", label: "Divider color", type: "color" },
    ],
  },
  {
    section: "Typography",
    controls: [
      {
        key: "--font-body",
        label: "Body font",
        type: "select",
        options: [
          // ── System / Neutral ──
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          '"Inter", system-ui, sans-serif',
          '"Roboto", system-ui, sans-serif',
          '"IBM Plex Sans", system-ui, sans-serif',
          '"Source Sans 3", system-ui, sans-serif',
          '"Work Sans", system-ui, sans-serif',

          // ── Academic / Editorial ──
          '"DM Serif Text", serif',
          '"Merriweather", serif',
          '"Libre Baskerville", serif',
          '"Crimson Pro", serif',
          '"Playfair Display", serif',

          // ── Soft / Cozy ──
          '"Nunito", system-ui, sans-serif',
          '"Quicksand", system-ui, sans-serif',
          '"Poppins", system-ui, sans-serif',
          '"Rubik", system-ui, sans-serif',

          // ── Tech / UI / Futurish ──
          '"JetBrains Mono", monospace',
          '"Space Grotesk", system-ui, sans-serif',
          '"Manrope", system-ui, sans-serif',
          '"Satoshi", system-ui, sans-serif',

          // ── Fun / Personality ──
          '"Comfortaa", system-ui, sans-serif',
          '"Karla", system-ui, sans-serif',
          '"Varela Round", system-ui, sans-serif',
        ],
      },
    ],
  },
  {
    section: "Calendar",
    controls: [
      { key: "--calendar-day-bg", label: "Day background", type: "color" },
      {
        key: "--calendar-day-bg-muted",
        label: "Muted day background",
        type: "color",
      },
      { key: "--calendar-task-bg", label: "Task background", type: "color" },
      { key: "--calendar-hover", label: "Hover overlay", type: "color" },
    ],
  },
];
