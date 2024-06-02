import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {

  const [path, setPath] = useState([
    [80, 100],
    [81, 99],
    [82, 99],
    [83, 98],
    [84, 102],
    [84.5, 105],
  ]);  

  const [pointA, setPointA] = useState([80, 100]); // координаты точки A
  const [pointB, setPointB] = useState([84.5, 105]); // координаты точки B

  return (
    <MapContainer 
      center={[80, 100]}
      zoom={4}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pointA}>
        <Popup>Точка A</Popup>
      </Marker>
      <Marker position={pointB}>
        <Popup>Точка B</Popup>
      </Marker>
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
}

export default MapComponent;
