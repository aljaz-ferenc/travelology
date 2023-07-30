import SingleLog from "../components/map/SingleLog";
import LogsList from "../components/map/LogsList";
import Map from "../pages/Map";
import "./MapLayout.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveLog, setData } from "../store/mapSlice";
import { setTheme, setUser } from "../store/userSlice";
import { getTrips, getUser } from "../api";
import { redirect, useLoaderData } from "react-router";

export default function MapLayout() {
  const dispatch = useDispatch();
  const [state, setState] = useState(0);
  const [trips, user] = useLoaderData();

  useEffect(() => {
    const theme = localStorage.getItem("travelology-theme");
    dispatch(setData(trips.data));
    dispatch(setUser(user.data));
    dispatch(setActiveLog(trips.data[0]?._id || null));
    dispatch(setTheme(JSON.parse(theme)));
  }, []);

  return (
    <div className="map-layout">
      <LogsList />
      <Map setState={setState} />
      <SingleLog setState={setState} state={state} />
    </div>
  );
}

export async function loader() {
  const trips = await getTrips();
  const user = await getUser();

  const data = await Promise.all([trips, user]);
  if (data[0].status === "success" && data[1].status === "success") {
    localStorage.setItem(
      "travelology-theme",
      JSON.stringify(data[1].data.theme)
    );
    return data;
  } else {
    return redirect("/");
  }
}
