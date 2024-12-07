import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import RouteSelector from "./RouteSelector";
import SimulationControls from "./SimulationControls";
import { generateRouteCoordinates } from "../utils/routes";
import L from "leaflet";
import "../styles/Map.css";

const carIcon = new L.Icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState([20.5937, 78.9629]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [progress, setProgress] = useState(0);
  const [showCurrentLocation, setShowCurrentLocation] = useState(true);



  const handleTimeFrameSelect = (timeFrame) => {
    if (timeFrame === "") {
      // Reset to device's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]); // Set to device's location
          setShowCurrentLocation(true);
        },
        () => {
          // Fallback to a default position if geolocation fails
          setCurrentPosition([20.5937, 78.9629]); // Center of India
          setShowCurrentLocation(true);
        }
      );
      setRouteCoordinates([]);
    } else {
      const newRouteCoordinates = generateRouteCoordinates(timeFrame);
      setRouteCoordinates(newRouteCoordinates);
      setCurrentPosition(newRouteCoordinates[0]);
      setShowCurrentLocation(false);
    }
    setSelectedTimeFrame(timeFrame);
    setRouteIndex(0);
  };
  

  const handlePlayPause = () => setIsMoving((prev) => !prev);
  const handleRestart = () => {
    setShowControls(false);
    setIsMoving(false);
    setSelectedTimeFrame("");
    setRouteCoordinates([]);
    setCurrentPosition([20.5937, 78.9629]);
    setRouteIndex(0);
    setProgress(0);
    setShowCurrentLocation(true);
  };
  const handleSpeedChange = (event) =>
    setSimulationSpeed(Number(event.target.value));

  useEffect(() => {
    if (isMoving && routeCoordinates.length > 0) {
      const intervalId = setInterval(() => {
        if (routeIndex < routeCoordinates.length - 1) {
          setRouteIndex((prevIndex) => prevIndex + 1);
          setCurrentPosition(routeCoordinates[routeIndex + 1]);
          setProgress(((routeIndex + 1) / (routeCoordinates.length - 1)) * 100);
        } else {
          clearInterval(intervalId);
          setIsMoving(false);
        }
      }, 1000 / simulationSpeed);

      return () => clearInterval(intervalId);
    }
  }, [isMoving, routeIndex, routeCoordinates, simulationSpeed]);

  return (
    <div>
      <MapContainer center={currentPosition} zoom={5} className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker showCurrentLocation={showCurrentLocation} />
        {routeCoordinates.length > 0 && (
          <>
            <Polyline positions={routeCoordinates} color="red" />
            <Marker position={currentPosition} icon={carIcon} />
          </>
        )}
      </MapContainer>
      <div className="controls-container">
        {showControls ? (
          <SimulationControls
            isMoving={isMoving}
            progress={progress}
            simulationSpeed={simulationSpeed}
            onProgressChange={(e) => {
              const newIndex = Math.floor(
                (routeCoordinates.length - 1) * (Number(e.target.value) / 100)
              );
              setRouteIndex(newIndex);
              setCurrentPosition(routeCoordinates[newIndex]);
              setProgress(Number(e.target.value));
            }}
            onPlayPause={handlePlayPause}
            onRestart={handleRestart}
            onSpeedChange={handleSpeedChange}
          />
        ) : (
          <RouteSelector
            selectedTimeFrame={selectedTimeFrame}
            onSelect={handleTimeFrameSelect}
          />
        )}
      </div>
    </div>
  );
};

export default Map;







