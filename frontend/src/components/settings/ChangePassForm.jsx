import "./ChangePassForm.scss";
import { useForm } from "react-hook-form";
import { changePassword } from "../../api";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ChangePassForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  function submitForm(data) {
    setError(null);
    setIsSubmitting(true);
    changePassword(data.password, data.newPassword)
      .then((res) => {
        if (res.status === "success") {
          navigate("/welcome");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form
      noValidate
      className="change-password"
      onSubmit={handleSubmit(submitForm)}
    >
      <h3>Change Password</h3>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", { required: "Required" })}
          type="password"
          id="password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        {error?.includes("Password incorrect") && (
          <p className="error">{error}</p>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          {...register("newPassword", {
            required: "Required",
            validate: (newPass) =>
              newPass !== watch("password") ||
              "New password cannot be the same as the old one",
          })}
          type="password"
          id="newPassword"
        />
        {errors.newPassword && (
          <p className="error">{errors.newPassword.message}</p>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          {...register("confirmNewPassword", {
            required: "Required",
            validate: (passConf) =>
              passConf === watch("newPassword") || "Passwords do not match",
          })}
          type="password"
          id="confirmNewPassword"
        />
        {errors.confirmNewPassword && (
          <p className="error">{errors.confirmNewPassword.message}</p>
        )}
      </div>
      <div className="submit-btn">
        {isSubmitting ? (
          <div className="spinner">
            <ClipLoader color="rgb(67, 61, 223)" />
          </div>
        ) : (
          <button>Change Password</button>
        )}
      </div>
    </form>
  );
}
