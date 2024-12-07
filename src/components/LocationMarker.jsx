import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";

const carIcon = new L.Icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const LocationMarker = ({ showCurrentLocation }) => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (showCurrentLocation) {
      map.locate().on("locationfound", (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    } else {
      setPosition(null);
    }
  }, [map, showCurrentLocation]);

  return position && showCurrentLocation ? (
    <Marker position={position} icon={carIcon} />
  ) : null;
};

export default LocationMarker;
