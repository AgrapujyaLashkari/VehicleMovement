import React from "react";

const SimulationControls = ({
  isMoving,
  progress,
  simulationSpeed,
  onProgressChange,
  onPlayPause,
  onRestart,
  onSpeedChange,
}) => (
  <div className="simulation-controls">
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      onChange={onProgressChange}
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
      onChange={onSpeedChange}
      className="speed-slider"
      aria-label="Simulation speed"
    />
  </div>
);

export default SimulationControls;
