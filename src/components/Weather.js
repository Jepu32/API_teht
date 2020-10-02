import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Weather() {
    const [city, setCity] = useState('');   //default helsinki
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a9c44d9574c3e8c65912fed0ec099b45`
    const [desc, setDesc] = useState('');
    const [tempp, setTemp] = useState('');
    const [humidity, setHumidity] = useState('');
    const [imgUrl, setImgUrl] =useState('http://openweathermap.org/img/wn/10d@2x.png');

    const getData = () =>{
        axios.get(weatherUrl)
        .then((res) => res.data)
        .then((res) =>{
            console.log(res.main.temp);
            setDesc(res.weather[0].description);
            setTemp(res.main.temp)
            setHumidity(res.main.humidity)
            setImgUrl(`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`)
        
        })
        
    }

    const handleChange = ({target}) =>{
        setCity(target.value);

    }
    return(
        <div className="weatherInfo">
            <input placeholder="etsi kaupungin sää.." onChange={handleChange} value={city} ></input>
            <button onClick={getData}>Search</button>
            <h2>forecast for: {city}</h2>
            <h3>temp: {tempp}°C</h3>
            <h3>description: {desc}</h3>
            <h3>humidity: {humidity}</h3>
            <img src={imgUrl} key={imgUrl} alt="sää kuva"></img>
        
        </div>
    )

}

export default Weather