import { useState, useEffect } from 'react';
import Header from './Header';
// import Footer from './Footer'; // Ensure you import Footer if it is used

const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
};

const cardHoverStyle = {
  transform: 'translateY(-5px)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
};

const headingStyle = {
  fontSize: '1.25rem',
  marginBottom: '10px',
  color: '#333',
  fontWeight: '600',
};

const qrCodeStyle = {
  maxWidth: '120px',
  height: 'auto',
  marginBottom: '10px',
};

// Mobile-first responsive adjustments
const responsiveStyles = {
  container: {
    padding: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  },
  card: {
    padding: '15px',
  },
  heading: {
    fontSize: '1rem',
  },
  qrCode: {
    maxWidth: '100px',
  },
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
    <div style={styles.pageContainer}>
      <Header />
      <main style={{ ...containerStyle, ...responsiveStyles.container }}>
        {riders.slice(0, 10).map((rider, index) => (
          <div
            key={rider.id}
            style={hoveredCard === index ? { ...cardStyle, ...cardHoverStyle, ...responsiveStyles.card } : { ...cardStyle, ...responsiveStyles.card }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h2 style={{ ...headingStyle, ...responsiveStyles.heading }}>{rider.name}</h2>
            <p>ID: {rider.id}</p>
            <img src={rider.qrCode} alt={`QR Code for ${rider.name}`} style={{ ...qrCodeStyle, ...responsiveStyles.qrCode }} />
          </div>
        ))}
      </main>
      
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

export default RiderList;
