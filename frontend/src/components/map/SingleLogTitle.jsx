import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveLog,
  updateCurrentPosition,
  updateTripTitle,
} from "../../store/mapSlice";
import { formatDate } from "../../functions/utils";
import { MdEditDocument } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import UpdateTitle from "./UpdateTitle";
import { updateTrip } from "../../api";
import { createPortal } from "react-dom";
import ConfirmModal from "./ConfirmModal";

export default function SingleLogTitle({ log }) {
  const logs = useSelector((state) => state.map.data);
  const activeLog = useSelector((state) => state.map.activeLog);
  const dispatch = useDispatch();
  const updateTitleRef = useRef();
  const [edited, setEdited] = useState();
  const [hovered, setHovered] = useState();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(id) {
    const log = logs.find((log) => log._id === id);
    dispatch(setActiveLog(id));
    dispatch(updateCurrentPosition(log.spots[0].position));
  }

  function handleSubmitEdit(data) {
    setEdited(false);
    updateTrip(log._id, data.title)
      .then((res) => {
        if (res.status === "success") {
          dispatch(
            updateTripTitle({ id: res.data._id, title: res.data.title })
          );
        } else {
          throw new Error("Could not update the trip");
        }
      })
      .catch((err) => console.log(err.message));
  }

  function handleOpenModal(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }

  return (
    <li
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(null)}
      key={log._id}
      className={`log ${activeLog === log._id ? "active" : ""}`}
      onClick={() => handleClick(log._id)}
    >
      <div>
        {!edited ? (
          <h3 className="log__title">{log.title}</h3>
        ) : (
          <UpdateTitle
            updateTitleRef={updateTitleRef}
            handleSubmitEdit={handleSubmitEdit}
            title={log.title}
          />
        )}
        <p className="log__date">{formatDate(log.startDate)}</p>
      </div>
      <div>
        {edited ? (
          <div className="edit-icons">
            <FaTrash onClick={handleOpenModal} className="edit-icons__delete" />
          </div>
        ) : (
          <MdEditDocument
            size="1.2rem"
            className="edit-btn"
            style={{
              display: hovered ? "block" : "none",
              opacity: 0.5,
            }}
            onClick={() => setEdited(true)}
          />
        )}
      </div>
      {isOpen &&
        createPortal(
          <ConfirmModal
            setEdited={setEdited}
            id={log._id}
            setIsOpen={setIsOpen}
            onBlur={() => setIsOpen(false)}
            text="Are you sure you want to delete this trip?"
          />,
          document.body
        )}
    </li>
  );
}
