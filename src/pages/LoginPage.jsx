import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../lib/validation";
import Field, { TextInput } from "../components/ui/Field";
import Button from "../components/ui/Button";
import SectionCard from "../components/ui/SectionCard";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "password123",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      login(values);
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  });

  return (
    <div className="auth-wrap">
      <SectionCard title="Mock Admin Login" subtitle="Use the assignment credentials to unlock protected routes.">
        <form className="auth-form" onSubmit={onSubmit}>
          <Field label="Email" error={errors.email?.message}>
            <TextInput type="email" error={errors.email} {...register("email")} />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <TextInput type="password" error={errors.password} {...register("password")} />
          </Field>
          {errors.root ? <p className="field-error">{errors.root.message}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <div className="credential-card">
            <strong>Assignment Credentials</strong>
            <span>admin@example.com</span>
            <span>password123</span>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}

export default LoginPage;
