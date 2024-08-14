// pages/riders.js
import { useEffect, useState } from 'react';

const Riders = () => {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    // Fetch riders here
    fetch('/api/riders')
      .then((response) => response.json())
      .then((data) => setRiders(data))
      .catch((error) => console.error('Error fetching riders:', error));
  }, []);

  return (
    <div>
      <h1>Riders List</h1>
      <ul>
        {riders.map((rider) => (
          <li key={rider.id}>{rider.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Riders;
