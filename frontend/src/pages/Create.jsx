import "./Create.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { createTrip } from "../api";
import { useLoaderData, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/userSlice";
import { createPortal } from "react-dom";
import ErrorModal from "../components/create/ErrorModal";
import markerIcon from '../assets/marker.png'
import { icon } from "leaflet";
import { ClipLoader } from "react-spinners";

const ICON = icon({
  iconUrl: markerIcon,
  iconSize: [25, 40],
})

export default function Create() {
  const { register, handleSubmit, control, formState: {errors} } = useForm();
  const [coordinates, setCoordinates] = useState([]);
  const [hasCoords, setHasCoords] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mapProvider = useSelector((state) => state.user.mapProvider);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const theme = localStorage.getItem("travelology-theme");
    dispatch(setTheme(JSON.parse(theme)));
  }, []);

  function submitForm(data) {
    if (data.spots.length !== coordinates.length) {
      return setHasCoords(false);
    }
    data.spots.forEach((spot, i) => {
      spot.position = coordinates[i];
      spot.date = new Date(spot.date).getTime();
      spot.id = crypto.randomUUID();
    });
    const startDate = Math.min(
      ...data.spots.map((spot) => new Date(spot.date).getTime())
    );
    const endDate = Math.max(
      ...data.spots.map((spot) => new Date(spot.date).getTime())
    );
    data.startDate = startDate;
    data.endDate = endDate;

    setIsSubmitting(true)
    createTrip(data)
      .then((res) => {
      if (res.status === "success") {
        navigate("/app/map")
      }else{
        throw new Error(res.message)
      }
    }).catch(err => console.log(err.message))
    .finally(() => setIsSubmitting(false))
  }

  const { fields, append, remove } = useFieldArray({
    name: "spots",
    control,
  });

  function addCoordinates(index, coords) {
    setCoordinates((prev) => {
      const updatedCoords = [...prev];
      updatedCoords[index] = coords;
      return updatedCoords;
    });
  }

  function MapControl({ index }) {
    const map = useMapEvent("click", (e) => {
      const coords = [e.latlng.lat, e.latlng.lng];
      addCoordinates(index, coords);
      if (coordinates.length === fields.length) setHasCoords(true);
    });
  }

  useEffect(() => {
    if (coordinates.length === fields.length) {
      setHasCoords(true);
    }
  }, [coordinates.length]);

  function handleRemove(index) {
    remove(index);
    setCoordinates((prev) => {
      prev[index] = undefined;
      const newCoords = prev.filter((p) => p !== undefined);
      return newCoords;
    });
  }

  return (
    <div className="create">
      {!hasCoords && createPortal(<ErrorModal />, document.body)}
      <form action="" onSubmit={handleSubmit(submitForm)}>
        <div className="create__title">
          <label htmlFor="title">Title of your trip</label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Required",
            })}
          />
          {errors?.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div className="create__description">
          <label htmlFor="description">Summary of your trip</label>
          <textarea
            rows={5}
            type="text"
            id="description"
            {...register("description", {
              required: "Required",
            })}
          />
          {errors?.description && <p className="error">{errors.description.message}</p>}
        </div>
        <div>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <div className="place-input">
                    <div className="place-input__inputs">
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <label htmlFor="title">Place</label>
                          <button
                            type="button"
                            onClick={() => handleRemove(index)}
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          id="title"
                          {...register(`spots.${index}.title`, {
                            required: "Required",
                          })}
                        />
                      </div>
                      <div>
                        <label htmlFor="content">Description</label>
                        <textarea
                          rows={10}
                          type="text"
                          id="content"
                          {...register(`spots.${index}.content`, {
                            required: "Required",
                          })}
                        />
                      </div>
                      <div>
                        <label htmlFor="date">Date</label>
                        <input
                          type="date"
                          id="date"
                          {...register(`spots.${index}.date`, {
                            required: "Required",
                          })}
                        />
                      </div>
                    </div>
                    <div className="place-input__map">
                      <MapContainer center={[45, 45]} zoom={3}>
                        <MapControl index={index} />
                        <TileLayer url={mapProvider}></TileLayer>
                        {coordinates[index] && (
                          <Marker icon={ICON} key={index} position={coordinates[index]} />
                        )}
                      </MapContainer>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="form-btns">
              <button
                type="button"
                onClick={() => append({ title: "", content: "" })}
              >
                Add a Place
              </button>
              <div className="submit-btn" style={{minWidth: '5rem', display: 'flex', justifyContent: 'center'}}>
          {isSubmitting ? (
            <div className="spinner">
              <ClipLoader color="rgb(67, 61, 223)" />
            </div>
          ) : (
            <button>Submit</button>
          )}
        </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
