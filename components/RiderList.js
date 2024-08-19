import { useState, useEffect } from 'react';

const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
};

const cardHoverStyle = {
  transform: 'translateY(-5px)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
};

const headingStyle = {
  fontSize: '1.5rem',
  marginBottom: '10px',
  color: '#333',
};

const qrCodeStyle = {
  maxWidth: '100px',
  height: 'auto',
  marginBottom: '10px',
};

const RiderList = () => {
  const [riders, setRiders] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchRiders = async () => {
      const response = await fetch('/api/riders');
      const data = await response.json();
      setRiders(data);
    };

    fetchRiders();
  }, []);

  return (
    <div style={containerStyle}>
      {riders.slice(0, 10).map((rider, index) => (
        <div
          key={rider.id}
          style={hoveredCard === index ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h2 style={headingStyle}>{rider.name}</h2>
          <p>ID: {rider.id}</p>
          <img src={rider.qrCode} alt={`QR Code for ${rider.name}`} style={qrCodeStyle} />
        </div>
      ))}
    </div>
  );
};

export default RiderList;
