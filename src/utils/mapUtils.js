import L from "leaflet";

export const carIcon = new L.Icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export const delhiToMumbaiCoordinates = [
  [28.6139, 77.2090], // Delhi
  [28.4595, 77.0266], // Gurugram
  [28.4089, 77.3178], // Faridabad
  [27.1767, 78.0081], // Agra
  [26.8467, 80.9462], // Lucknow
  [25.4358, 81.8463], // Prayagraj
  [23.2599, 77.4126], // Bhopal
  [21.1458, 79.0882], // Nagpur
  [19.0760, 72.8777], // Mumbai
];

export const delhiToKanpurCoordinates = [
  [28.6139, 77.2090], // Delhi
  [28.4595, 77.0266], // Gurugram
  [28.4089, 77.3178], // Faridabad
  [27.1767, 78.0081], // Agra
  [27.5706, 80.1988], // Kannauj
  [26.4499, 80.3319], // Kanpur
];

export const generateRouteCoordinates = (timeFrame) => {
  switch (timeFrame) {
    case "today":
      return delhiToMumbaiCoordinates;
    case "yesterday":
      return delhiToKanpurCoordinates;
    default:
      return [];
  }
};
