import React, { useEffect, useState } from 'react';
import './App.css';  // Import the CSS file
import TreeMapComponent from './TreemapComp';

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/bank_mdds')
      .then(response => {
        return response.json(); // Explicitly return the promise
      })
      .then(data => {
        setData(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className="App">
      <TreeMapComponent 
      data_source={data}
      />
      {/* <div className="grid">
        {data.map((price, index) => (
          <div
            key={index}
            className="cell"
            style={{ backgroundColor: priceToColor(price) }}
          >
            {price.toFixed(2)}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default App;