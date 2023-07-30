import "./Map.scss";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import markerIcon from '../assets/marker.png'
import { icon } from "leaflet";

const ICON = icon({
  iconUrl: markerIcon,
  iconSize: [25, 40],
})

export default function Map({ setState }) {
  const [spots, setSpots] = useState([]);
  const layerRef = useRef();
  const { data, currentPosition, activeLog } = useSelector(
    (state) => state.map
  );
  const mapProvider = useSelector((state) => state.user.mapProvider);


  useEffect(() => {
    if (!activeLog || data.length === 0) return;
    const log = data.find((log) => log._id === activeLog);
    setSpots(log.spots);
  }, [activeLog]);

  return (
    <section className="map">
      <MapContainer ref={layerRef} center={currentPosition} zoom={13}>
        <Control log={activeLog} currentPosition={currentPosition} />
        <TileLayer url={mapProvider} />
        {spots.length > 0 &&
          spots.map((spot) => (
            <Marker
            icon={ICON}
              key={spot.id}
              position={spot.position}
              eventHandlers={{
                click: () => {
                  const log = data.find((log) => log._id === activeLog);
                  const currentSpot = log.spots.findIndex(
                    (spotAll) => spotAll.id === spot.id
                  );
                  setState(currentSpot);
                },
              }}
            >
              <Popup>{spot.title}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </section>
  );
}

function Control() {
  const position = useSelector((state) => state.map.currentPosition);
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position]);

  return null;
}
