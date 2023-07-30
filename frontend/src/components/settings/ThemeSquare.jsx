import "./ThemeSquare.scss";

export default function ThemeSquare({ primary, secondary, accent, onClick }) {
  return (
    <div
      onClick={onClick}
      className="theme-square"
      style={{
        background: `linear-gradient(to right, rgb(${primary.join(
          ","
        )}) 0% 33%, rgb(${secondary.join(",")}) 33% 66%, rgb(${accent.join(
          ","
        )}) 66%)`,
      }}
    ></div>
  );
}
