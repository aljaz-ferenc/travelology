import "./RootLayout.scss";
import { Outlet } from "react-router";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";

export default function RootLayout() {

  return (
    <>
      <div className="root-layout">
        <Sidebar />
        <Header />
        <Outlet />
      </div>
    </>
  );
}
