import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoIosCreate, IoMdSettings } from "react-icons/io";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <img className="sidebar__logo" src={logo} alt="" />
      <div className="sidebar__links">
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
    </aside>
  );
}
