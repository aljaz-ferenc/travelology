import { useDispatch, useSelector } from "react-redux";
import "./SingleLog.scss";
import { useEffect } from "react";
import { updateCurrentPosition } from "../../store/mapSlice";
import { formatDate } from "../../functions/utils";

export default function SingleLog({ state, setState }) {
  const { activeLog, data } = useSelector((state) => state.map);
  const log = data.find((log) => log._id === activeLog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!log) return;
    setState(0);
    dispatch(updateCurrentPosition(log.spots[0].position));
  }, [activeLog]);

  useEffect(() => {
    if (!log) return;
    dispatch(updateCurrentPosition(log.spots[state].position));
  }, [state]);

  function handleSetState(num) {
    if (
      (num === -1 && state <= 0) ||
      (num === 1 && state >= log.spots.length - 1)
    )
      return;
    setState((prev) => prev + num);
  }

  return (
    <>
      {log && (
        <section className="single-log">
          {data.length === 0 ? (
            <h2 className="single-log__alt">
              Create a new trip to save memories :)
            </h2>
          ) : (
            <div>
              <h2>
                {log.title.toUpperCase()}
                {log.startDate === log.endDate ? (
                  <span> {`(${formatDate(log.startDate)})`}</span>
                ) : (
                  <span>
                    {" "}
                    {`(${formatDate(log.startDate)} - ${formatDate(
                      log.endDate
                    )})`}
                  </span>
                )}
              </h2>
              {log.spots[state]?.title && (
                <div className="spot">
                  <h3 className="spot__title">{log.spots[state].title}</h3>
                  <p className="spot__date">
                    {formatDate(log.spots[state].date)}
                  </p>
                  <p className="spot__content">{log.spots[state].content}</p>
                </div>
              )}
              <div className="single-log__buttons">
                {state !== 0 && (
                  <button
                    className="btn-previous"
                    onClick={() => handleSetState(-1)}
                  >
                    Previous
                  </button>
                )}
                {state !== log.spots.length - 1 && (
                  <button
                    className="btn-next"
                    onClick={() => handleSetState(1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
