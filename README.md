# To Do List
A personal prototyping project built to solve a very specific pain point.

I needed **one to-do app** that supports both **Kanban** *and* **Calendar** views, without forcing me to choose a single way of thinking about my tasks.

Some days I think in lists.  
Some days I think in dates.  
Some days I think in chaos.

This app is for all three.
![ToDoList](https://github.com/user-attachments/assets/99456377-d3f8-48d8-90ed-28a52d7325ac)

---

## Features

- **Kanban board view**
  - Multiple lists
  - Drag-and-drop columns and tasks
- **Calendar view**
  - Tasks laid out by due date
  - Same data, different mental model
- **Theme system**
  - Multiple built-in aesthetics
  - Switch themes depending on mood, energy, or chaos level
  - Themes affect colors, typography, and UI surfaces

---

## Themes matter

Most productivity tools assume a single “neutral” aesthetic.  
That doesn’t work for me.

Some days I need:
- soft, calming colors
- warm, low-pressure visuals

Other days I need:
- high contrast
- aggressive colors
- visual pressure to get things done

This app treats **aesthetics as a functional feature**, not decoration.

---

## DIY Theme Editor

A built-in theme editor that allows users to create and persist a fully custom theme.

- Fully customizable themes  
- Control **everything**:
  - colors
  - fonts
  - spacing
  - borders
  - calendar-specific surfaces
- Live preview in both board and calendar views
- Section-level reset and JSON export

Inspired by:
- MySpace / Tumblr CSS
- AO3 skins

But designed to be **intuitive**, not raw CSS.

Think expressive customization without breaking the app.


---

## Tech stack

- React
- TypeScript
- Vite
- Local state + `localStorage` (no backend)

---

This project is intentionally opinionated.

It assumes:
- productivity is emotional
- tools should adapt to mental state
- visual design can reduce friction or increase momentum
Yes, the app is literally called **To Do List.**  
With the period.
