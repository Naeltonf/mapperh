import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

const HeatMapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatData = data.map(point => [point[1], point[0], point[2]]);
    const heat = L.heatLayer(heatData, { 
      radius: 20, 
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [data, map]);

  return null;
};

const SignalHeatMap = ({ data }) => {
  return (
    <MapContainer center={[-25.435231, -54.596999]} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatMapLayer data={data} />
    </MapContainer>
  );
};

export default SignalHeatMap;
