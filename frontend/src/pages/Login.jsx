import { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";
import "./Login.scss";

export default function Login() {
  const [state, setState] = useState("register");

  return (
    <div className="login">
      {state === "login" ? (
        <LoginForm setState={setState} />
      ) : (
        <RegisterForm setState={setState} />
      )}
    </div>
  );
}
