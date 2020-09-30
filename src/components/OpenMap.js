import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const OpenMap = () => {
const [activeMarker, setActiveMarker] = useState(null);
const [bikes, setBikes] = useState([]);
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&appid=a9c44d9574c3e8c65912fed0ec099b45`
const [desc, setDesc] = useState('');
const [tempp, setTemp] = useState('');
const [imgUrl, setImgUrl] =useState('http://openweathermap.org/img/wn/10d@2x.png');

useEffect(() => {
axios.get('https://api.citybik.es/v2/networks/citybikes-helsinki')
    .then((res) => res.data)
    .then((res) => setBikes(res.network.stations))
}, [])
 
useEffect(() =>{
    axios.get(weatherUrl)
            .then((res) => res.data)
            .then((res) =>{
                console.log(res.main.temp);
                setDesc(res.weather[0].description);
                setTemp(res.main.temp)
                setImgUrl(`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`)
            
            })
        }, [])

    //Map center koordinaatti = kamppi
    return(
        <div>
            <Map center={[60.1675, 24.9311]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {bikes.map(bike => (
                <Marker key={bike.id} position={[bike.latitude, bike.longitude]}
                onClick={()=>setActiveMarker(bike)}
                />
            ))}
            {activeMarker && (<Popup
            position={[activeMarker.latitude, activeMarker.longitude]}
            onClose={()=>setActiveMarker(null)}
            >
                <div className="markerPopup">
                    <h2>{activeMarker.name}</h2>
            <p>Free bikes: {activeMarker.free_bikes}</p>
            <p>Free slots: {activeMarker.empty_slots}</p>
            <p>Lämpöasteita: {tempp}°C</p>
            <p>{desc}</p>
            <img src={imgUrl} key={imgUrl} alt="sää kuva"></img>
                </div>
            </Popup>
            )}
            </Map>
            
        </div>
    )

}

export default OpenMap;