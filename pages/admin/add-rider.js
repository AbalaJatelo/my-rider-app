// pages/admin/add-rider.js
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const handleAddRider = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const id = formData.get('id');
  const name = formData.get('name');
  const qrCode = formData.get('qrCode');

  await fetch('/api/riders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, qrCode }),
  });
};

const AddRider = () => (
  <div>
    <Header />
    <main>
      <h1>Add Rider</h1>
      <form onSubmit={handleAddRider}>
        <input type="text" name="id" placeholder="ID" required />
        <input type="text" name="name" placeholder="Name" required />
        <input type="text" name="qrCode" placeholder="QR Code URL" required />
        <button type="submit">Add Rider</button>
      </form>
    </main>
    <Footer />
  </div>
);

export default AddRider;
