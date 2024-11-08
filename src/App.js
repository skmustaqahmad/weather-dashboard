import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Favorites from './components/Favorites';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  // Fetch favorites from JSON server when the app loads
  useEffect(() => {
    axios.get('http://localhost:5000/favorites')
      .then((response) => {
        const favoriteCities = response.data.map(item => item.name);
        setFavorites(favoriteCities);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }, []);

  const getWeather = async (city) => {
    const apiKey = '"YOUR_API_KEY"';
    try {
      const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
      const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`);
      setWeatherData({ currentWeather: currentWeather.data, forecast: forecast.data });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const addToFavorites = (city) => {
    if (city && !favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);

      // Add the city to JSON server
      axios.post('http://localhost:5000/favorites', { name: city })
        .then(() => {
          console.log(`${city} added to favorites`);
        })
        .catch((error) => {
          console.error('Error adding city to favorites:', error);
        });
    }
  };

  const removeFromFavorites = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);

    // Find and delete the city from JSON server
    axios.get('http://localhost:5000/favorites')
      .then((response) => {
        const cityData = response.data.find(item => item.name === city);
        if (cityData) {
          axios.delete(`http://localhost:5000/favorites/${cityData.id}`)
            .then(() => {
              console.log(`${city} removed from favorites`);
            })
            .catch((error) => {
              console.error('Error removing city from favorites:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching favorites for removal:', error);
      });
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-blue-300">
      <h1 className="text-3xl font-bold text-center mt-5">Weather Dashboard</h1>
      <Search onSearch={getWeather} onAddFavorite={addToFavorites} />

      <button 
        onClick={toggleUnit} 
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Toggle to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>

      <WeatherDisplay weatherData={weatherData} />
      <Favorites favorites={favorites} onRemove={removeFromFavorites} />
    </div>
  );
}

export default App;
