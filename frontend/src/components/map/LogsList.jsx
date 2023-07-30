import { useDispatch, useSelector } from "react-redux";
import "./LogsList.scss";
import { setActiveLog } from "../../store/mapSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import SingleLogTitle from "./SingleLogTitle";

export default function LogsList() {
  const logs = useSelector((state) => state.map.data);
  const activeLog = useSelector((state) => state.map.activeLog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (logs.length === 0 || activeLog) return;
    dispatch(setActiveLog(logs[0]._id));
  }, [logs]);

  return (
    <section className="logs-list">
      {logs.length === 0 ? (
        <button
          onClick={() => navigate("../create")}
          className="logs-list__create-btn"
        >
          Create your first trip
        </button>
      ) : (
        <ul className="logs-list__logs">
          {logs.map((log) => (
            <SingleLogTitle key={log._id} log={log} />
          ))}
        </ul>
      )}
    </section>
  );
}
