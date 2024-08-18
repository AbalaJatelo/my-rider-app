import { useState, useEffect } from 'react';

const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const headingStyle = {
  fontSize: '2rem',
  marginBottom: '20px',
  color: '#FF6600',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
};

const thStyle = {
  backgroundColor: '#FF6600',
  color: '#fff',
  padding: '12px',
  textAlign: 'left',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

const imgStyle = {
  maxWidth: '100px',
  height: 'auto',
};

const RiderList = () => {
  const [riders, setRiders] = useState([]);

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
      <h2 style={headingStyle}>Riders</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {riders.slice(0, 10).map((rider) => (
            <tr key={rider.id}>
              <td style={tdStyle}>{rider.id}</td>
              <td style={tdStyle}>{rider.name}</td>
              <td style={tdStyle}>
                <img src={rider.qrCode} alt={`QR Code for ${rider.name}`} style={imgStyle} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiderList;
