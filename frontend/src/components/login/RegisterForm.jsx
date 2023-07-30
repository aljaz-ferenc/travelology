import "./RegisterForm.scss";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { registerUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm({ setState }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function submitForm(data) {
    setError(null);
    setIsSubmitting(true);
    registerUser(data)
      .then((res) => {
        if (res.status === "success") {
          navigate("/app");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.message.includes("email_1 dup key"))
          setError("This email already exists");
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="register-form">
      <form
        className="register-form__form"
        noValidate
        onSubmit={handleSubmit(submitForm)}
      >
        <h2>Register</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
        </div>
        {error === "This email already exists" && (
          <p className="error">{error}</p>
        )}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <div className="input-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              validate: (val) => val === watch("password"),
            })}
          />
          {errors.passwordConfirm && (
            <p className="error">Passwords do not match</p>
          )}
        </div>
        <div className="submit-btn">
          {isSubmitting ? (
            <div className="spinner">
              <ClipLoader color="rgb(67, 61, 223)" />
            </div>
          ) : (
            <button>Register</button>
          )}
        </div>
        <span onClick={() => setState("login")}>
          Already have an account? Login!
        </span>
      </form>
    </div>
  );
}
