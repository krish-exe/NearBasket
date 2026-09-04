import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock, ShoppingBasket } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const INITIAL_FORM = { name: "", email: "", phone: "", password: "", confirmPassword: "" };

function validate(form) {
  const errors = {};

  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = "Enter a valid email address.";

  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  else if (!PHONE_RE.test(form.phone.trim())) errors.phone = "Enter a valid 10-digit phone number.";

  if (!form.password) errors.password = "Password is required.";
  else if (!PASSWORD_RE.test(form.password))
    errors.password = "Password must be at least 8 characters and include a letter and a number.";

  if (!form.confirmPassword) errors.confirmPassword = "Please confirm your password.";
  else if (form.confirmPassword !== form.password) errors.confirmPassword = "Passwords do not match.";

  return errors;
}

function Field({ label, error, icon: Icon, children }) {
  return (
    <label className="block space-y-1">
      <span className="font-label text-label-md text-on-surface-variant">{label}</span>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
        {children}
      </div>
      {error && <span className="block font-body text-body-sm text-error">{error}</span>}
    </label>
  );
}

export default function SignupPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setSubmitted(false);
  };

  const inputClass = (field) =>
    `w-full pl-11 pr-4 py-2.5 bg-surface-container-low border rounded-md font-body text-body-md focus:outline-none focus:ring-2 focus:ring-primary ${
      errors[field] ? "border-error focus:ring-error" : "border-outline-variant"
    }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <main className="flex-grow w-full flex items-center justify-center px-margin-mobile py-2xl">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-lg shadow-card p-xl space-y-lg">
        <div className="flex flex-col items-center gap-sm text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBasket className="text-primary" size={24} />
          </div>
          <h1 className="font-display text-headline-md text-on-surface">Create your account</h1>
          <p className="font-body text-body-md text-on-surface-variant">Join NearBasket to shop your local stores.</p>
        </div>

        {submitted && (
          <div className="bg-primary/10 text-primary font-label text-label-md px-4 py-3 rounded-md text-center">
            Account created successfully.
          </div>
        )}

        <form className="space-y-md" onSubmit={handleSubmit} noValidate>
          <Field label="Full Name" error={errors.name} icon={User}>
            <input value={form.name} onChange={handleChange("name")} className={inputClass("name")} placeholder="Your name" />
          </Field>

          <Field label="Email" error={errors.email} icon={Mail}>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className={inputClass("email")}
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Phone Number" error={errors.phone} icon={Phone}>
            <input
              value={form.phone}
              onChange={handleChange("phone")}
              className={inputClass("phone")}
              placeholder="10-digit number"
            />
          </Field>

          <Field label="Password" error={errors.password} icon={Lock}>
            <input
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              className={inputClass("password")}
              placeholder="At least 8 characters"
            />
          </Field>

          <Field label="Confirm Password" error={errors.confirmPassword} icon={Lock}>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              className={inputClass("confirmPassword")}
              placeholder="Re-enter your password"
            />
          </Field>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-on-primary font-label text-label-md rounded-full hover:bg-primary-container transition-colors shadow-sm"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center font-body text-body-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
