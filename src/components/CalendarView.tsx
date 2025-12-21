import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/task";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarView() {
  const { tasks, columns } = useTasks();

  const columnsById = Object.fromEntries(columns.map((c) => [c.id, c]));

  const today = new Date();

  // Infinite month navigation state
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const goPrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));

  const goNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  /* ---------- Calendar grid generation ---------- */

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const startDay = startOfMonth.getDay(); // 0–6
  const daysInMonth = endOfMonth.getDate();

  const days: Date[] = [];

  // Previous month spillover
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }

  // Next month spillover (fill to 42 cells)
  while (days.length < 35) {
    const last = days[days.length - 1];
    days.push(
      new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1)
    );
  }

  /* ---------- Group tasks by date ---------- */

  const tasksByDate = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    if (!task.dueDate) return acc;
    acc[task.dueDate] ??= [];
    acc[task.dueDate].push(task);
    return acc;
  }, {});

  /* ---------- Render ---------- */

  return (
    <div className="calendar-view">
      {/* Header */}
      <div className="calendar-header">
        <h2 className="calendar-title">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="calendar-controls">
          <button
            className="calendar-nav"
            onClick={goPrevMonth}
            aria-label="Previous month"
          >
            ‹
          </button>

          <button
            className="calendar-today"
            onClick={() =>
              setCurrentMonth(
                new Date(today.getFullYear(), today.getMonth(), 1)
              )
            }
          >
            Today
          </button>

          <button
            className="calendar-nav"
            onClick={goNextMonth}
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Weekday labels */}
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}

        {/* Days */}
        {days.map((date) => {
          const iso = date.toISOString().slice(0, 10);

          const isToday = date.toDateString() === today.toDateString();

          const isCurrentMonth = date.getMonth() === month;

          return (
            <div
              key={iso}
              className={[
                "calendar-day",
                isToday && "today",
                !isCurrentMonth && "outside",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="calendar-day-number">{date.getDate()}</div>

              <div className="calendar-tasks">
                {tasksByDate[iso]?.map((task) => {
                  const listColor = columnsById[task.columnId]?.color;

                  return (
                    <div key={task.id} className="calendar-task-card">
                      <div className="calendar-task-row">
                        {listColor && (
                          <span
                            className="calendar-task-dot"
                            style={{ backgroundColor: listColor }}
                          />
                        )}

                        <div
                          className={[
                            "calendar-task-title",
                            task.completed && "is-completed",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {task.title}
                        </div>
                      </div>

                      {task.notes && (
                        <div className="calendar-task-notes">{task.notes}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
