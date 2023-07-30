import { useEffect, useState } from "react";
import "./NotFound.scss";
import { useNavigate } from "react-router";

export default function NotFound() {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time < 1) {
      navigate("/app/map");
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time, navigate]);

  return (
    <div className="not-found">
      <h3>Oops, looks like this page doesn't exist.</h3>
      <p>Redirecting ({time})...</p>
    </div>
  );
}
