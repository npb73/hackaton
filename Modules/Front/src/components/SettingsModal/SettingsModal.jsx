import { useEffect, useState, useRef } from "react";
import axios from "../../utils/Api";

function SettingsModal({ isOpen, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [pointInfo, setPointInfo] = useState([]);
  const [shipList, setShipList] = useState([]);
  useEffect(() => {
    axios.get('scheduleship/all').then(response => {
      setData(response.data);
      console.log(response.data);

      axios.get('pointinfo/all').then(response => {
        setPointInfo(response.data);
        console.log('SSSSAAA: ', response.data);
      });
    });

    axios.get('ship/all').then(response => {
      setShipList(response.data);
      console.log('SHIIIOIOPPS: ', response.data)
    })
  }, []);

  const handleStartPointChange = (id, value) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, startPoint: value } : item
      )
    );
  };

  const handleEndPointChange = (id, value) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, endPoint: value } : item
      )
    );
  };

  const handleDateChange = (id, value) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, dateStart: value } : item
      )
    );
  };

  const pathNameRef = useRef(null);
  const shipIdRef = useRef(null);
  const startPointRef = useRef(null);
  const endPointRef = useRef(null);
  const dateRef = useRef(null);

  const handleCreateNewPath = () => {
    setAddModalOpen(false);
    axios.post('scheduleship', {
        "name": pathNameRef?.current?.value,
        "iceClassShip": "None",
        "speed": 0,
        "startPoint": Number(startPointRef?.current?.value),
        "endPoint": Number(endPointRef?.current?.value),
        "dateStart": new Date(dateRef?.current?.value).getTime(),
        "isIcebreaker": true,
        "shipId": shipIdRef?.current?.value
    })

    // console.log(pathNameRef?.current?.value)
    // console.log(shipIdRef?.current?.value)
    // console.log(startPointRef?.current?.value)
    // console.log(endPointRef?.current?.value)
    // console.log(dateRef?.current?.value)
  }


  return (
    <div
      style={{
        display: isOpen ? 'flex' : 'none',
        opacity: isOpen ? 1 : 0
      }}
      className="modalSettings_wrapper"
    >
      <div className="modalSettings_container">
        <div className="header_settings">
          <h1>Список маршрутов</h1>
          <button onClick={() => {setAddModalOpen(true)}}>Добавить запись</button>
          <button onClick={handleClose}>Закрыть</button>
        </div>
        <div className="body_settings">
          {data.map(el => (
            <div key={el.id} className="item_wrapper">
              <span>{el.name}</span>

              <span>
                {
                  pointInfo.map(pointInfo => {
                    return (
                      pointInfo.id == el.startPoint &&
                      <span key={pointInfo.id + 'start'}>{pointInfo.pointName}</span>
                    )
                  })
                }
              </span>

              <span>
                {
                  pointInfo.map(pointInfo => {
                    return (
                      pointInfo.id == el.endPoint &&
                      <span key={pointInfo.id + 'end'}>{pointInfo.pointName}</span>
                    )
                  })


                }
                {
                  el.endPoint == 0 && <span>-</span>
                }
              </span>
              
              {/* <select
                value={el.startPoint}
                onChange={e => handleStartPointChange(el.id, e.target.value)}
              >
                {pointInfo.map(point => (
                  <option key={point.id + 'a'} value={point.id}>
                    {point.pointName}
                  </option>
                ))}
              </select>
              <select
                value={el.endPoint}
                onChange={e => handleEndPointChange(el.id, e.target.value)}
              >
                {pointInfo.map(point => (
                  <option key={point.id + 'b'} value={point.id}>
                    {point.pointName}
                  </option>
                ))}
              </select> */}

              <input
                type="date"
                value={el.dateStart.split('T')[0]} // Adjusting date format for input field
                onChange={e => handleDateChange(el.id, e.target.value)}
                disabled
              />
            </div>
          ))}
        </div>
      </div>

      { 
        isAddModalOpen &&
        <div className="add_path_modal_container">
          <div className="add_path_modal_wrapper">
            <div className="path_header">
              <h2>Создать маршрут</h2>
            </div>
            <div className="path_body">
                <input ref={pathNameRef} type="text" placeholder="Название"/>
                <select ref={shipIdRef} placeholder="Выберите корабль">
                  {
                    shipList.map(el => {
                      return (
                        <option key={el.id} value={el.id}>{el.name}</option>
                      )
                    })
                  }
                </select>
                <select ref={startPointRef}>
                  {pointInfo.map(point => (
                    <option key={point.id + 'a'} value={point.id}>
                      {point.pointName}
                    </option>
                  ))}
                </select>
                <select ref={endPointRef}>
                  {pointInfo.map(point => (
                    <option key={point.id + 'b'} value={point.id}>
                      {point.pointName}
                    </option>
                  ))}
                </select>
                <input type="date" ref={dateRef} />
            </div>
            <div className="path_bottom">
              <button onClick={handleCreateNewPath}>Сохранить</button>
              <button onClick={() => {setAddModalOpen(false)}}>Отменить</button>
            </div>
          </div>
        </div>
      }
      
    </div>
  );
}

export default SettingsModal;
