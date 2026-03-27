import { cn } from "../../lib/utils";

function Button({ children, className, variant = "primary", ...props }) {
  return (
    <button
      className={cn(
        "button",
        variant === "secondary" && "button-secondary",
        variant === "ghost" && "button-ghost",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
