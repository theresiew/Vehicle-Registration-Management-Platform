import { cn } from "../../lib/utils";

function Field({ label, error, children, hint }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && !error ? <span className="field-hint">{hint}</span> : null}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}

export function TextInput({ error, ...props }) {
  return <input className={cn("input", error && "input-error")} {...props} />;
}

export function SelectInput({ error, children, ...props }) {
  return (
    <select className={cn("input", error && "input-error")} {...props}>
      {children}
    </select>
  );
}

export default Field;
