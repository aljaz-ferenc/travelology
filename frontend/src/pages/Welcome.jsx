import { useState } from "react";
import "./Welcome.scss";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";

export default function Welcome() {
  const [state, setState] = useState("login");

  return (
    <div className="welcome">
      <div className="welcome__content">
        <div className="text">
          <h1>
            <span>Travelology</span>, your personal travel journal!
          </h1>
          <h2>
            Easily save trip locations and craft beautiful narratives of your
            experiences.
          </h2>
        </div>
      </div>
      <div className="welcome__form">
        {state === "login" ? (
          <LoginForm setState={setState} />
        ) : (
          <RegisterForm setState={setState} />
        )}
      </div>
    </div>
  );
}
