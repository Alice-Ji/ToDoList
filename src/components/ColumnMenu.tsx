import { useState, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { SortMode } from "../types/column";

interface Props {
  anchorRef: React.RefObject<HTMLElement>;
  onDelete: () => void;
  onSortChange: (sort: SortMode) => void;
  currentSort?: SortMode;
}

export default function ColumnMenu({
  anchorRef,
  onDelete,
  onSortChange,
  currentSort = "manual",
}: Props) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [showSort, setShowSort] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.right - 180,
    });
  }, [anchorRef]);

  const openSort = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setShowSort(true);
  };

  const scheduleCloseSort = () => {
    closeTimer.current = window.setTimeout(() => {
      setShowSort(false);
    }, 150);
  };

  if (!pos) return null;

  return createPortal(
    <div
      className="column-menu-panel"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 9999,
      }}
    >
      {/* SORT (hover container, not button) */}
      <div
        className="menu-item sort-item"
        onMouseEnter={openSort}
        onMouseLeave={scheduleCloseSort}
      >
        <span>Sort</span>
        <span className="menu-arrow">›</span>

        {showSort && (
          <div
            className="column-menu-sub"
            onMouseEnter={openSort}
            onMouseLeave={scheduleCloseSort}
          >
            <button
              data-active={currentSort === "manual"}
              onClick={() => onSortChange("manual")}
            >
              Manual
            </button>
            <button
              data-active={currentSort === "due"}
              onClick={() => onSortChange("due")}
            >
              Due Date
            </button>
            <button
              data-active={currentSort === "alpha"}
              onClick={() => onSortChange("alpha")}
            >
              Alphabetical
            </button>
          </div>
        )}
      </div>

      {/* DELETE */}
      <button className="menu-item danger" onClick={onDelete} type="button">
        Delete
      </button>
    </div>,
    document.body
  );
}
