import { useState } from "react";
import BoardView from "./components/BoardView";
import CalendarView from "./components/CalendarView";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function App() {
  const [view, setView] = useState<"board" | "calendar">("board");

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

      <ThemeSwitcher />
    </div>
  );
}
