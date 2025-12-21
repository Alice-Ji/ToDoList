import { useState, useRef, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { themes } from "../themes";

export default function ThemeSwitcher() {
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Floating button */}
      <button
        ref={buttonRef}
        className="theme-switcher-button"
        onClick={() => setOpen((o) => !o)}
        title="Change theme"
      >
        🎨
      </button>

      {/* Panel */}
      {open && (
        <div ref={panelRef} className="theme-switcher-panel">
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
                style={{
                  background: theme.vars["--card"],
                }}
              >
                <div className="theme-option-title">{theme.name}</div>
                <div className="theme-option-preview">
                  <div
                    className="theme-option-accent"
                    style={{
                      background: theme.vars["--accent"],
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
