import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import { carIcon } from "../utils/mapUtils";

export const LocationMarker = ({ showCurrentLocation }) => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (showCurrentLocation) {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    } else {
      setPosition(null);
    }
  }, [map, showCurrentLocation]);

  return position === null || !showCurrentLocation ? null : (
    <Marker position={position} icon={carIcon} />
  );
};
