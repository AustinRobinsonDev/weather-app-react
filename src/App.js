import React, { useState } from 'react';

const api = {
  key: '2f3e1ebce3e2b3f7dbcfa724a704b8a2',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (evt) => {
    if ( evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      });
    }
  }

  const dateBuilder = d => {
    let date = String(new window.Date())
    date = date.slice(3,15)
    return date; 
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
          className="search-bar"
          placeholder='Search..'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
           />
        </div>
        {weather.message === "city not found" ? <h1 style={{ color: 'white', textAlign: 'center'}}>City not found</h1> : <div></div>}
        {(typeof weather.main !== "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
