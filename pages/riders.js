import { useEffect, useState } from 'react';
import Header from '../components/Header'; // Ensure the path is correct
import Footer from '../components/Footer'; // Ensure the path is correct

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainStyle = {
  flex: 1,
  padding: '80px 20px 20px', // Padding to account for the fixed header
  backgroundColor: '#f9f9f9',
};

const headingStyle = {
  textAlign: 'center',
  color: '#0070f3', // Updated color
  fontSize: '2rem',
  marginBottom: '20px',
};

const inputStyle = {
  padding: '12px',
  marginBottom: '20px',
  width: '100%',
  border: '2px solid #0070f3', // Updated color
  borderRadius: '8px',
  fontSize: '1rem',
  boxSizing: 'border-box',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)', // 5 columns
  gap: '20px',
  listStyle: 'none',
  padding: '0',
  margin: '0',
};

const listItemStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '15px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const nameStyle = {
  fontSize: '1.2rem',
  color: '#333',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const imgStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '8px',
  border: '2px solid #0070f3', // Updated color
  marginBottom: '10px',
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
      {/* Ensure Header has fixed positioning in its own file */}
      <main style={mainStyle}>
      <Header /> 
        <h1 style={headingStyle}>Riders List</h1>
        <input
          type="text"
          placeholder="Search riders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={inputStyle}
        />
        <ul style={gridStyle}>
          {filteredRiders.slice(0, 10).map((rider) => (
            <li key={rider.id} style={listItemStyle}>
              <img src={rider.qrCode} alt={`QR Code for ${rider.name}`} style={imgStyle} />
              <span style={nameStyle}>{rider.name}</span>
            </li>
          ))}
        </ul>
        {filteredRiders.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No riders found</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Riders;
