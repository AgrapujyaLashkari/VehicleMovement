import React from "react";

export const SimulationControls = ({
  isMoving,
  progress,
  simulationSpeed,
  routeCoordinates,
  onProgressChange,
  onPlayPause,
  onRestart,
  onSpeedChange,
}) => {
  return (
    <div className="simulation-controls">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => {
          const newProgress = Number(e.target.value);
          onProgressChange(newProgress);
        }}
        className="progress-slider"
        aria-label="Simulation progress"
      />
      <button onClick={onPlayPause} className="play-pause-button">
        {isMoving ? "Pause" : "Play"}
      </button>
      <button onClick={onRestart} className="restart-button">
        Restart
      </button>
      <input
        type="range"
        min="1"
        max="10"
        value={simulationSpeed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="speed-slider"
        aria-label="Simulation speed"
      />
    </div>
  );
};

