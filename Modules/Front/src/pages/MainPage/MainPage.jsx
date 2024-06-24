import MapComponent from "../../components/Map/MapComponent";
import SignalRReceiver from "../../components/SignalR/SignalR";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import SettingsModal from "../../components/SettingsModal/SettingsModal";

import { useState } from "react";

function MainPage() {

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const [pickedShip, setPickedShip] = useState(null);

  const handleOpenModal = (bool) => {
    setSettingsOpen(bool)
  }

  const handleSignalRMessage = (msg) => {
    console.log('msg from signalR: ', msg);
  }

  return (
    <div className="main">
      <SettingsModal setOpen={handleOpenModal} isOpen={isSettingsOpen}/>
      <MainWrapper shipInfo={pickedShip} openModal={handleOpenModal}/>
      <SignalRReceiver 
        url={'http://95.174.95.181:8080/mainPage'}
        onMessage={handleSignalRMessage}
      />
      <MapComponent 
        onShipClick={(ship) => {setPickedShip(ship)}}
      />
    </div>
  )
}

export default MainPage;
