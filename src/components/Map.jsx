import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { LocationMarker } from "./LocationMarker";
import { SimulationControls } from "./SimulationControls";
import { carIcon, generateRouteCoordinates } from "../utils/mapUtils";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

export const Map = () => {
  const [currentPosition, setCurrentPosition] = useState([20.5937, 78.9629]); // Center of India as default
  const [routeIndex, setRouteIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [progress, setProgress] = useState(0);
  const [showCurrentLocation, setShowCurrentLocation] = useState(true);

  const handleTimeFrameSelect = (event) => {
    setSelectedTimeFrame(event.target.value);
    const newRouteCoordinates = generateRouteCoordinates(event.target.value);
    setRouteCoordinates(newRouteCoordinates);
    setCurrentPosition(newRouteCoordinates[0]);
    setRouteIndex(0);
    setShowCurrentLocation(false);
  };

  const startSimulation = () => {
    setShowControls(true);
    setIsMoving(true);
  };

  const handlePlay = () => setIsMoving(true);
  const handlePause = () => setIsMoving(false);
  const handleRestart = () => {
    setShowControls(false);
    setIsMoving(false);
    setSelectedTimeFrame("");
    setRouteCoordinates([]);
    setCurrentPosition([20.5937, 78.9629]); // Reset to center of India
    setRouteIndex(0);
    setProgress(0);
    setShowCurrentLocation(true);
  };
  const handleSpeedChange = (newSpeed) => setSimulationSpeed(newSpeed);

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
            routeCoordinates={routeCoordinates}
            onProgressChange={(newProgress) => {
              const newIndex = Math.floor(
                (routeCoordinates.length - 1) * (newProgress / 100)
              );
              setRouteIndex(newIndex);
              setCurrentPosition(routeCoordinates[newIndex]);
              setProgress(newProgress);
            }}
            onPlayPause={isMoving ? handlePause : handlePlay}
            onRestart={handleRestart}
            onSpeedChange={handleSpeedChange}
          />
        ) : (
          <>
            <select
              value={selectedTimeFrame}
              onChange={handleTimeFrameSelect}
              className="time-frame-select"
              aria-label="Select time frame"
            >
              <option value="">Select from below</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
            </select>
            <button
              onClick={startSimulation}
              className="start-simulation-button"
              disabled={!selectedTimeFrame}
            >
              Start Simulation
            </button>
          </>
        )}
      </div>
    </div>
  );
};

