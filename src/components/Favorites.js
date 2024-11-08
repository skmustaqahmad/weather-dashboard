import React from 'react';

function Favorites({ favorites, onRemove }) {
  return (
    <div className="favorites mt-5 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-3">Favorite Cities</h2>
      {favorites.length > 0 ? (
        <ul className="list-none p-0">
          {favorites.map((city, index) => (
            <li key={index} className="flex items-center mb-2">
              <span className="mr-2 bg-orange-400 text-white px-2 py-1 rounded hover:bg-red-700">{city}</span>
              <button 
                onClick={() => onRemove(city)} 
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite cities added yet.</p>
      )}
    </div>
  );
}

export default Favorites;
