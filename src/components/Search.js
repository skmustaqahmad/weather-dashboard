import React, { useState } from 'react';

function Search({ onSearch, onAddFavorite }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) {
      onSearch(city);
    }
  };

  const handleAddFavorite = () => {
    if (city) {
      onAddFavorite(city);
    }
  };

  return (
    <div className="search flex flex-col items-center mt-5">
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name" 
        className="border px-3 py-2 rounded mb-3"
      />
      <button 
        onClick={handleSearch} 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mb-2"
      >
        Search
      </button>
      <button 
        onClick={handleAddFavorite} 
        className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
      >
        Add to Favorites
      </button>
    </div>
  );
}

export default Search;
