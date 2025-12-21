import { createPortal } from "react-dom";

interface Props {
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  title,
  description,
  onCancel,
  onConfirm,
}: Props) {
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>

        {description && <p>{description}</p>}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>

          <button className="btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
