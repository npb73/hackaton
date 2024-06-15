import MapComponent from "../../components/Map/MapComponent";
import SignalRReceiver from "../../components/SignalR/SignalR";
import MainWrapper from "../../components/MainWrapper/MainWrapper"
import { useState } from "react";


function MainPage() {

  const [pickedShip, setPickedShip] = useState(null);

  const handleSignalRMessage = (msg) => {
    // console.log('msg from signalR: ', msg);
  }

  return (
    <div className="main">
      <MainWrapper shipInfo={pickedShip}/>
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
