// pages/admin/add-rider.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QRCode from 'qrcode';

const generateRiderId = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

const handleAddRider = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const age = formData.get('age');
  const sex = formData.get('sex');
  const bikeRegNumber = formData.get('bikeRegNumber');
  const nationalId = formData.get('nationalId');

  const id = generateRiderId();
  const qrUrl = `https://my-rider-app.vercel.app/riders/${id}`;
  const qrCode = await QRCode.toDataURL(qrUrl);

  await fetch('/api/riders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      firstName,
      lastName,
      age,
      sex,
      bikeRegNumber,
      nationalId,
      qrCode,
    }),
  });

  alert('Rider added successfully!');
  event.target.reset();

  window.history.back();
};

const AddRider = () => {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
        <h1>Admin Dashboard</h1>
        <h2>
          <a href="./add-rider" style={{ display: 'block', marginBottom: '20px', textDecoration: 'none', color: '#FF6600', fontSize: '16px' }}>Add New Rider</a>
        </h2>
        <button onClick={() => router.push('/')} style={{ backgroundColor: '#FF6600', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px' }}>
          Go to Dashboard
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '20px' }}>
        <h1>Add Rider</h1>
        <form onSubmit={handleAddRider} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" name="firstName" placeholder="First Name" required style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="text" name="lastName" placeholder="Last Name" required style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="number" name="age" placeholder="Age" required style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <select name="sex" required style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" name="bikeRegNumber" placeholder="Bike Registration Number" required style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input type="text" name="nationalId" placeholder="National ID" required style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <button type="submit" style={{ backgroundColor: '#FF6600', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px' }}>Add Rider</button>
        </form>
      </main>
    </div>
  );
};

export default AddRider;
