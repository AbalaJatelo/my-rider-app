// pages/admin/add-rider.js
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QRCode from 'qrcode';

// Function to generate a random rider ID
const generateRiderId = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

const handleAddRider = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const name = formData.get('name');

  // Generate a unique rider ID
  const id = generateRiderId();

  // Generate the QR code URL
  const qrUrl = `hhttps://my-rider-app.vercel.app/riders/${id}`;

  // Generate QR code as a data URL
  const qrCode = await QRCode.toDataURL(qrUrl);

  // Save the rider details to the server
  await fetch('/api/riders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, qrCode }),
  });

  alert('Rider added successfully!');
  event.target.reset(); // Reset the form
};

const AddRider = () => (
  <div>
    <Header />
    <main>
      <h1>Add Rider</h1>
      <form onSubmit={handleAddRider}>
        {/* ID and QR Code fields are automatically generated */}
        <input type="text" name="name" placeholder="Name" required />
        <button type="submit">Add Rider</button>
      </form>
    </main>
    <Footer />
  </div>
);

export default AddRider;
