import React from 'react';

function WeatherDisplay({ weatherData }) {
  if (!weatherData) {
    return <div className="text-center mt-5">Please search for a city to view the weather.</div>;
  }

  const { currentWeather, forecast } = weatherData;
  const currentTemp = currentWeather.main.temp;
  const weatherDescription = currentWeather.weather[0].description;

  return (
    <div className="mt-5 text-center">
      <h2 className="text-xl">{currentWeather.name}</h2>
      <p className="text-lg">{weatherDescription}</p>
      <p className="text-2xl font-bold">{currentTemp}°</p>

      <div className="mt-5">
        <h3 className="text-2xl">5-Day Forecast</h3>
        <div className="forecast-container grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
  {forecast.list.slice(0, 5).map((item, index) => (
    <div
      key={index}
      className="forecast-card flex flex-col items-center p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      {/* Date and Time */}
      <p className="text-lg font-semibold mb-2 text-gray-700">
        {new Date(item.dt_txt).toLocaleDateString('en-US', {
          weekday: 'long',
        })}
      </p>

      {/* Temperature */}
      <p className="text-2xl font-bold text-blue-600">
        {item.main.temp}°
      </p>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={item.weather[0].description}
        className="w-16 h-16"
      />

      {/* Weather Description */}
      <p className="text-sm text-gray-500 capitalize">
        {item.weather[0].description}
      </p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default WeatherDisplay;
