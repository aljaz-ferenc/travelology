import { useDispatch, useSelector } from "react-redux";
import { deleteTrip } from "../../api";
import { deleteLog } from "../../store/mapSlice";
import "./ConfirmModal.scss";

export default function ConfirmModal({ text, setIsOpen, id }) {
  const dispatch = useDispatch();

  function handleClick() {
    deleteTrip(id)
      .then((res) => {
        if (res.status === "success") {
          const id = res.data._id;
          dispatch(deleteLog(id));
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsOpen(false));
  }

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__content">
        <p className="confirm-modal__content--text">{text}</p>
        <div className="confirm-modal__content--buttons">
          <button onClick={() => handleClick(id)}>Confirm</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
