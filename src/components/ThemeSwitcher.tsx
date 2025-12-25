import { useState, useRef, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { themes } from "../themes";
import { customTheme } from "../themes/custom";

type Props = {
  onOpenCustomTheme: () => void;
};

const CUSTOM_KEY = "taskboard.customTheme";

function loadCustomTheme() {
  const saved = localStorage.getItem(CUSTOM_KEY);
  return {
    name: "Custom",
    vars: saved ? JSON.parse(saved) : customTheme.vars,
  };
}

export default function ThemeSwitcher({ onOpenCustomTheme }: Props) {
  const { currentTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const custom = loadCustomTheme();

  return (
    <>
      <button
        ref={buttonRef}
        className="theme-switcher-button"
        onClick={() => setOpen((o) => !o)}
        title="Change theme"
      >
        🎨
      </button>

      {open && (
        <div ref={panelRef} className="theme-switcher-panel">
          {/* Preset themes */}
          {themes.map((theme) => (
            <button
              key={theme.name}
              className={`theme-option ${
                currentTheme.name === theme.name ? "selected" : ""
              }`}
              onClick={() => {
                setTheme(theme);
                setOpen(false);
              }}
              style={{
                color: theme.vars["--text"],
                fontFamily: theme.vars["--font-body"],
              }}
            >
              <div
                className="theme-option-card"
                style={{ background: theme.vars["--card"] }}
              >
                <div className="theme-option-title">{theme.name}</div>
                <div className="theme-option-preview">
                  <div
                    className="theme-option-accent"
                    style={{ background: theme.vars["--accent"] }}
                  />
                </div>
              </div>
            </button>
          ))}

          {/* Custom theme — ONE card */}
          <button
            className={`theme-option ${
              currentTheme.name === "Custom" ? "selected" : ""
            }`}
            onClick={() => {
              setTheme(custom); // apply custom
              setOpen(false);
            }}
            style={{
              color: custom.vars["--text"],
              fontFamily: custom.vars["--font-body"],
            }}
          >
            <div
              className="theme-option-card"
              style={{ background: custom.vars["--card"] }}
            >
              <div className="theme-option-title">
                <span>Custom</span>

                {/* ✎ Edit CTA */}
                <button
                  className="theme-option-edit"
                  onClick={(e) => {
                    e.stopPropagation(); // 🔑 prevent applying theme
                    setTheme(custom);
                    onOpenCustomTheme();
                    setOpen(false);
                  }}
                  aria-label="Edit custom theme"
                >
                  ✎
                </button>
              </div>

              <div className="theme-option-preview">
                <div
                  className="theme-option-accent"
                  style={{ background: custom.vars["--accent"] }}
                />
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
