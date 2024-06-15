/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

import { useEffect, useRef, useState } from "react";
import axios from "../../utils/Api";

function MainWrapper({shipInfo}){

  const [isInfoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if(shipInfo !== null){
      setInfoOpen(true);
    }
  }, [shipInfo])

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('uploadedFile', file);

      axios.post('ship/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Файл успешно загружен', response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке файла', error);
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mainwrapper_wrapper">
      {
        shipInfo && 

        <div 
        className="shipinfo_container"
        style={{
          translate: isInfoOpen ? '0px' : '-50vw'
        }}  
      >
        <div className="shipimage">

        </div>
        <hr />
        <div className="shipname">
          {shipInfo.name}
        </div>

        <div className="shipclass">
          Класс судна: 
          <div className="time">
            {shipInfo.iceClassShip}
          </div>
        </div>
        <div className="shipclass">
          Дата отбытия: 
          <div className="time">
            {new Date(shipInfo?.schedules[0]?.dateStart).toLocaleDateString() + " "}
            {new Date(shipInfo?.schedules[0]?.dateStart).toLocaleTimeString()}
          </div>
          
          
        </div>

        <hr />

        <div className="shipname">
          Караван:
        </div>

        {/* <div>
          {JSON.stringify(shipInfo)}
        </div>   */}
      </div>
      }
      

      <div className="buttons">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className="excel_button" onClick={handleButtonClick}>Отправить файл .xlsx</button>
      </div>
    </div>
  )
}

export default MainWrapper;
