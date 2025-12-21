import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  anchorRef: React.RefObject<HTMLElement>;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function TaskMenu({ anchorRef, onDuplicate, onDelete }: Props) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 6,
      left: rect.right - 160,
    });
  }, [anchorRef]);

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
      <button className="menu-item" onClick={onDuplicate}>
        Duplicate
      </button>

      <button className="menu-item danger" onClick={onDelete}>
        Delete
      </button>
    </div>,
    document.body
  );
}
