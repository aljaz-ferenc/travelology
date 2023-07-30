import "./Header.scss";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../api";
import { NavLink, useNavigate } from "react-router-dom";
import { setTheme } from "../../store/userSlice";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoIosCreate, IoMdSettings } from "react-icons/io";

export default function Header() {
  const email = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    logoutUser().finally(() => {
      navigate("/");
      dispatch(setTheme("dark"));
    });
  }

  return (
    <header className="header">
      <div className="header__links">
        <NavLink to="map">
          <FaMapMarkedAlt size="1.5rem" />
          <span>Map</span>
        </NavLink>
        <NavLink to="create">
          <IoIosCreate size="1.5rem" />
          <span>Create</span>
        </NavLink>
        <NavLink to="settings">
          <IoMdSettings size="1.5rem" />
          <span>Settings</span>
        </NavLink>
      </div>
      <div>
        <p className="header__mail">{email}</p>
      </div>
      <div onClick={handleLogout} className="header__logout">
        <TbLogout size="1.5rem" />
      </div>
    </header>
  );
}
