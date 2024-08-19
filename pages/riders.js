import { useEffect, useState } from 'react';

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  textAlign: 'center',
  color: '#FF6600',
  fontSize: '2rem',
  marginBottom: '20px',
};

const inputStyle = {
  padding: '12px',
  marginBottom: '20px',
  width: '100%',
  border: '2px solid #FF6600',
  borderRadius: '8px',
  fontSize: '1rem',
  boxSizing: 'border-box',
};

const listStyle = {
  listStyle: 'none',
  padding: '0',
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const nameStyle = {
  fontSize: '1.2rem',
  color: '#333',
  fontWeight: 'bold',
};

const imgStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '8px',
  border: '2px solid #FF6600',
};

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
    <div style={containerStyle}>
      <h1 style={headingStyle}>Riders List</h1>
      <input
        type="text"
        placeholder="Search riders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={inputStyle}
      />
      <ul style={listStyle}>
        {filteredRiders.map((rider) => (
          <li key={rider.id} style={listItemStyle}>
            <span style={nameStyle}>{rider.name}</span>
            <img src={rider.qrCode} alt={`QR Code for ${rider.name}`} style={imgStyle} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Riders;
