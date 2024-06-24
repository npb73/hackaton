/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Pane } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "../../utils/Api";

import shipIcon from '../../assets/ship.png';
import portIcon from '../../assets/port.png';

function filterAndSortShips(ships) {
  const filteredShips = ships.filter(ship => {
    const lastSchedule = ship.schedules[ship.schedules.length - 1];
    return Array.isArray(lastSchedule.ways) && lastSchedule.ways.length > 0;
});

  const sortedShips = filteredShips.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
  });

  return sortedShips;
}

function MapComponent({onShipClick}) {
  const [ports, setPorts] = useState([]); 
  const [ships, setShips] = useState([]);

  function getAllPorts(){
    axios.get('pointinfo/all').then(response => {
      console.log(response.data);
      setPorts(response.data);
    })
  }

  function getAllShips(){
    axios.get('ship/all').then(response => {
      console.log('get all ships: ', filterAndSortShips(response.data));
      setShips(filterAndSortShips(response.data));
    })
  }

  useEffect(() => {
    getAllPorts();
    getAllShips();
  }, [])

  const customIcon = new L.Icon({
    iconUrl: shipIcon,
    iconSize: [41, 41], 
    iconAnchor: [20, 41], 
    popupAnchor: [0, -41] 
  });

  const customIconPort = new L.Icon({
    iconUrl: portIcon,
    iconSize: [41, 41], 
    iconAnchor: [20, 41], 
    popupAnchor: [0, -41]
  })

  const [pickedShipPath, setPickedShipPath] = useState([]);

  const handleMarkerClick = (ship) => {
    onShipClick(ship);

    let path = [];
    for(let i = 0; i < ship?.schedules[ship?.schedules?.length-1]?.ways.length; i++){
      path.push(ship?.schedules[ship?.schedules?.length-1]?.ways[i].split(' ').reverse());
    }

    setPickedShipPath(path)
  }

  const handlePopupClose = () => {
    onShipClick(null);
    setPickedShipPath([])
  }

  return (
    <MapContainer 
      center={[80, 100]}
      zoom={4}
      style={{ height: '100vh', width: '100vw' }}
      maxZoom={8}
      minZoom={3}
      worldCopyJump={true} 
      markerZoomAnimation={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // noWrap={true}
      />

      {
        ports.map((port) => {
          return (
            <Marker key={port.id} position={[port.latitude, port.longitude]} icon={customIconPort}>
              <Popup>{port.pointName}</Popup>
            </Marker>
          )
        })
      }

      <Pane name="ships" style={{ zIndex: 9000 }}>
      {
        ships.map((ship) => {
          return (
            <Marker 
              key={ship.id} 
              position={ship?.schedules[ship?.schedules?.length-1]?.ways[0].split(' ').reverse()} 
              icon={customIcon}
              eventHandlers={{ 
                click: () => {handleMarkerClick(ship)},
                popupclose: () => {handlePopupClose()}
              }}
            >
              <Popup>{ship.name}</Popup>
            </Marker>
          )
        })
      }   
      </Pane>  

      <Polyline positions={pickedShipPath} color="blue" />

    </MapContainer>
  );
}

export default MapComponent;
