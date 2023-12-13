import "./Settings.scss";
import map1 from "../assets/1.png";
import map2 from "../assets/2.png";
import map3 from "../assets/3.png";
import map4 from "../assets/4.png";
import { setMapProvider, setTheme, setUser } from "../store/userSlice";
import { updateUser } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ThemeSquare from "../components/settings/ThemeSquare";
import ChangePassForm from "../components/settings/ChangePassForm";
import DeleteAccForm from "../components/settings/DeleteAccForm";

const maps = [
  // {
  //   image: map1,
  //   provider:
  //     "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  //   name: "Smooth Dark",
  // },
  // {
  //   image: map2,
  //   provider:
  //     "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
  //   name: "Smooth",
  // },
  {
    image: map3,
    provider:
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    name: "Toner",
  },
  {
    image: map4,
    provider: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    name: "Hot",
  },
];

export default function Settings() {
  const mapProvider = useSelector((state) => state.user.mapProvider);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);

  useEffect(() => {
    const theme = localStorage.getItem("travelology-theme");
    dispatch(setTheme(JSON.parse(theme)));
  }, []);

  function handleUpdateMap(map) {
    updateUser({ mapProvider: map })
      .then((res) => {
        if (res.status === "success") {
          dispatch(setMapProvider(map));
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function changeTheme(theme) {
    dispatch(setTheme(theme));
    localStorage.setItem("travelology-theme", JSON.stringify(theme));
    updateUser({ theme });
  }

  return (
    <div className="settings">
      <div className="settings__map">
        <h2>Map Style</h2>
        <div>
          {maps.map((map, i) => (
            <div key={map.name}>
              <img
                onClick={() => handleUpdateMap(map.provider)}
                src={map.image}
                alt="map style"
                className={map.provider === mapProvider ? "active" : ""}
              />
              <h3>
                {map.name}{" "}
                {map.provider === mapProvider ? <span>(current)</span> : null}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="settings__theme">
        <h2>Theme</h2>
        <div className="theme-squares">
          <div>
            <div className={`square ${theme === "dark" ? "active" : ""}`}>
              <ThemeSquare
                onClick={() => changeTheme("dark")}
                primary={[12, 19, 27]}
                secondary={[25, 34, 48]}
                accent={[67, 61, 223]}
              />
            </div>
            <h3>Dark</h3>
          </div>
          <div>
            <div className={`square ${theme === "light" ? "active" : ""}`}>
              <ThemeSquare
                onClick={() => changeTheme("light")}
                primary={[240, 239, 239]}
                secondary={[249, 249, 249]}
                accent={[230, 79, 59]}
              />
            </div>
            <h3>Light</h3>
          </div>
          <div>
            <div className={`square ${theme === "blue" ? "active" : ""}`}>
              <ThemeSquare
                onClick={() => changeTheme("blue")}
                primary={[32, 37, 74]}
                secondary={[55, 67, 128]}
                accent={[44, 223, 146]}
              />
            </div>
            <h3>Blue</h3>
          </div>
        </div>
      </div>
      <div className="settings__account">
        <h2>Account</h2>
        <ChangePassForm />
        <DeleteAccForm />
      </div>
    </div>
  );
}
