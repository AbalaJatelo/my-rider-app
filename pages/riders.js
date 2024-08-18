import { useEffect, useState } from 'react';

const Riders = () => {
  const [riders, setRiders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRiders, setFilteredRiders] = useState([]);

  useEffect(() => {
    // Fetch riders here
    fetch('/api/riders')
      .then((response) => response.json())
      .then((data) => {
        setRiders(data);
        setFilteredRiders(data); // Initially, display all riders
      })
      .catch((error) => console.error('Error fetching riders:', error));
  }, []);

  useEffect(() => {
    // Filter riders based on search query
    const filtered = riders.filter((rider) =>
      rider.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRiders(filtered);
  }, [searchQuery, riders]);

  return (
    <div>
      <h1>Riders List</h1>
      <input
        type="text"
        placeholder="Search riders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      <ul>
        {filteredRiders.map((rider) => (
          <li key={rider.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ marginRight: '20px' }}>{rider.name}</span>
            <img src={rider.qrCode} alt={`QR Code for ${rider.name}`} style={{ width: '50px', height: '50px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Riders;
