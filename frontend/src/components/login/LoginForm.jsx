import { useNavigate } from "react-router";
import { loginUser } from "../../api";
import "./LoginForm.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function LoginForm({ setState }) {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { email: "user123@email.com", password: "asdf" },
  });
  const navigate = useNavigate();

  function submitForm(data) {
    setError(null);
    setIsSubmitting(true);
    loginUser(data)
      .then((res) => {
        if (res.status === "success") {
          localStorage.setItem(
            "travelology-theme",
            JSON.stringify(res.data.theme)
          );
          navigate("/app");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        setError(err.message)
        console.log(err)
        console.log(err.message)
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="login-form">
      <form
        noValidate
        className="login-form__form"
        onSubmit={handleSubmit(submitForm)}
      >
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          {error && error.includes("user") && <p className="error">{error}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          {error && error.includes("Password") && (
            <p className="error">{error}</p>
          )}
        </div>
        <div className="submit-btn">
          {isSubmitting ? (
            <div className="spinner">
              <ClipLoader color="rgb(67, 61, 223)" />
            </div>
          ) : (
            <button>Login</button>
          )}
        </div>
        <span onClick={() => setState("register")}>
          Don't have an account? Register!
        </span>
      </form>
    </div>
  );
}
