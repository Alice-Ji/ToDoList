import { useState } from "react";
import BoardView from "./components/BoardView";
import CalendarView from "./components/CalendarView";
import ThemeSwitcher from "./components/ThemeSwitcher";
import CustomTheme from "./components/CustomTheme";

export default function App() {
  const [view, setView] = useState<"board" | "calendar">("board");
  const [screen, setScreen] = useState<"app" | "customTheme">("app");

  if (screen === "customTheme") {
    return <CustomTheme onClose={() => setScreen("app")} />;
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <button
          className="view-toggle-button"
          onClick={() => setView(view === "board" ? "calendar" : "board")}
        >
          {view === "board" ? "Calendar view" : "Board view"}
        </button>
      </header>

      <main className="app-content">
        {view === "board" ? <BoardView /> : <CalendarView />}
      </main>

      <ThemeSwitcher onOpenCustomTheme={() => setScreen("customTheme")} />
    </div>
  );
}
