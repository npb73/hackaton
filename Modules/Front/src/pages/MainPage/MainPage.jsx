import MapComponent from "../../components/Map/MapComponent";
import SignalRReceiver from "../../components/SignalR/SignalR";

function MainPage() {

  const handleSignalRMessage = (msg) => {
    console.log('msg from signalR: ', msg);
  }

  return (
    <div className="main">
      <SignalRReceiver 
        url={'http://localhost:8080/'}
        onMessage={handleSignalRMessage}
      />
      <MapComponent />
    </div>
  )
}

export default MainPage;
