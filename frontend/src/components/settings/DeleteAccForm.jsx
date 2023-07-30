import { useState } from "react";
import { deleteUser } from "../../api";
import "./DeleteAccForm.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function DeleteAccForm() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function submitForm(data) {
    setError(null);
    setIsSubmitting(true);
    deleteUser(data.password)
      .then((res) => {
        if (res.status === "success") {
          navigate("/welcome");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form className="delete-account" onSubmit={handleSubmit(submitForm)}>
      <h3>Delete Account</h3>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
      </div>
      {error?.includes("Password incorrect") && (
        <p className="error">{error}</p>
      )}
      <div className="submit-btn">
        {isSubmitting ? (
          <div className="spinner">
            <ClipLoader color="rgb(67, 61, 223)" />
          </div>
        ) : (
          <button>Delete Account</button>
        )}
      </div>
    </form>
  );
}
