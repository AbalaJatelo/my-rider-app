// components/RiderList.js
import { useState, useEffect } from 'react';

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
    <div>
      <h2>Riders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {riders.slice(0, 10).map((rider) => (
            <tr key={rider.id}>
              <td>{rider.id}</td>
              <td>{rider.name}</td>
              <td><img src={rider.qrCode} alt={`QR Code for ${rider.name}`} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiderList;
