// components/Map.tsx
'use client'
import React, { useEffect } from "react";
import * as L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "leaflet-search/src/leaflet-search.css"; // Import Search Control CSS
import "leaflet-search"; // Import Search Control plugin

const Map: React.FC = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([39.9526, -75.1652], 13); // Default view of Philadelphia

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    // Add markers for hospitals (example data)
    const hospitalMarkers = [
      { lat: 39.9526, lng: -75.1652, name: "Hospital A" },
      { lat: 39.9480, lng: -75.1558, name: "Hospital B" },
      { lat: 39.9580, lng: -75.1758, name: "Hospital C" },
    ];

    // Create a layer group for markers
    const markerLayer = L.layerGroup().addTo(map);

    // Add markers to the map
    hospitalMarkers.forEach((markerData) => {
      L.marker([markerData.lat, markerData.lng])
        .addTo(markerLayer)
        .bindPopup(markerData.name);
    });

    // Add search control
    const searchControl = new (L.Control as any).Search({
      position: "topright",
      layer: markerLayer,
      initial: false,
      zoom: 15,
      marker: false,
      autoType: false,
      propertyName: "name", // Match the property used in the popup
      textPlaceholder: "Search for hospitals...",
    });
    map.addControl(searchControl);

    return () => {
      // Cleanup when the component unmounts
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      className="relative h-96 w-full rounded-lg shadow-md"
      style={{ height: "500px" }} // Adjust height as needed
    />
  );
};

export default Map;