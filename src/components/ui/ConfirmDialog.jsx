import Button from "./Button";

function ConfirmDialog({ open, title, message, onCancel, onConfirm, busy }) {
  if (!open) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog-card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm} disabled={busy}>
            {busy ? "Deleting..." : "Confirm Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
