import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { themeControls } from "../themes/themeControls";
import { customTheme } from "../themes/custom";

import BoardView from "./BoardView";
import CalendarView from "./CalendarView";

export default function CustomTheme({ onClose }: { onClose: () => void }) {
  const { currentTheme, setTheme } = useTheme();
  const [preview, setPreview] = useState<"board" | "calendar">("board");

  /* ───────── helpers ───────── */

  function updateVar(key: string, value: string) {
    setTheme({
      name: "Custom",
      vars: {
        ...currentTheme.vars,
        [key]: value,
      },
    });
  }

  function resetSection(sectionKey: string) {
    const section = themeControls.find((s) => s.section === sectionKey);
    if (!section) return;

    const resetVars = Object.fromEntries(
      section.controls.map((control) => [
        control.key,
        customTheme.vars[control.key],
      ])
    );

    setTheme({
      name: "Custom",
      vars: {
        ...currentTheme.vars,
        ...resetVars,
      },
    });
  }

  /* ───────── render ───────── */

  return (
    <div className="custom-theme-layout">
      <aside className="custom-theme-controls">
        {/* Toolbar */}
        <div className="custom-theme-toolbar">
          <h2>Custom theme</h2>

          <div className="preview-toggle">
            <button
              className={preview === "board" ? "active" : ""}
              onClick={() => setPreview("board")}
            >
              Board
            </button>
            <button
              className={preview === "calendar" ? "active" : ""}
              onClick={() => setPreview("calendar")}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Controls */}
        {themeControls.map((section) => (
          <div key={section.section} className="theme-section">
            <div className="theme-section-header">
              <h3>{section.section}</h3>
              <button
                className="reset-section"
                onClick={() => resetSection(section.section)}
              >
                Reset
              </button>
            </div>

            {section.controls.map((control) => {
              const value = currentTheme.vars[control.key];

              switch (control.type) {
                case "color":
                  return (
                    <label key={control.key}>
                      {control.label}
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => updateVar(control.key, e.target.value)}
                      />
                    </label>
                  );

                case "range":
                  return (
                    <label key={control.key}>
                      {control.label}
                      <input
                        type="range"
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        value={parseInt(value)}
                        onChange={(e) =>
                          updateVar(control.key, `${e.target.value}px`)
                        }
                      />
                    </label>
                  );

                case "select":
                  return (
                    <label key={control.key}>
                      {control.label}
                      <select
                        value={value}
                        onChange={(e) => updateVar(control.key, e.target.value)}
                      >
                        {control.options!.map((opt) => (
                          <option value={opt}>
                            {opt.replace(/["]/g, "").split(",")[0]}
                          </option>
                        ))}
                      </select>
                    </label>
                  );

                default:
                  return null;
              }
            })}
          </div>
        ))}

        <div className="custom-theme-actions">
          <button
            className="btn-secondary"
            onClick={() =>
              navigator.clipboard.writeText(
                JSON.stringify(currentTheme.vars, null, 2)
              )
            }
          >
            Copy JSON
          </button>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </aside>

      {/* Preview */}
      <main className="custom-theme-preview">
        <div className="app-content">
          {preview === "board" ? <BoardView /> : <CalendarView />}
        </div>
      </main>
    </div>
  );
}
