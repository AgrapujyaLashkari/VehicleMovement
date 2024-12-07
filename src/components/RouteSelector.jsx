import React from "react";

const RouteSelector = ({ selectedTimeFrame, onSelect }) => {
  return (
    <select
      value={selectedTimeFrame}
      onChange={(e) => onSelect(e.target.value)}
      className="time-frame-select"
      aria-label="Select time frame"
    >
      <option value="">Select from below</option>
      <option value="today">Today (Delhi to Mumbai)</option>
      <option value="yesterday">Yesterday (Delhi to Kanpur)</option>
    </select>
  );
};

export default RouteSelector;
