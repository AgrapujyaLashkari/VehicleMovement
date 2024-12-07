export const delhiToMumbaiCoordinates = [
    [28.6139, 77.2090],
    [28.4595, 77.0266],
    [28.4089, 77.3178],
    [27.1767, 78.0081],
    [26.8467, 80.9462],
    [25.4358, 81.8463],
    [23.2599, 77.4126],
    [21.1458, 79.0882],
    [19.0760, 72.8777],
  ];
  
  export const delhiToKanpurCoordinates = [
    [28.6139, 77.2090],
    [28.4595, 77.0266],
    [28.4089, 77.3178],
    [27.1767, 78.0081],
    [27.5706, 80.1988],
    [26.4499, 80.3319],
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
  