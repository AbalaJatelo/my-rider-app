import { useRouter } from 'next/router';
import { useState } from 'react';
import QRCode from 'qrcode';

const generateRiderId = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

const AddRider = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleAddRider = async (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const age = formData.get('age');
    const sex = formData.get('sex');
    const bikeRegNumber = formData.get('bikeRegNumber');
    const nationalId = formData.get('nationalId');

    const id = generateRiderId();
    const qrUrl = `http://okadamonipot.com/${id}`;

    try {
      // Generate QR code URL
      const qrCode = await QRCode.toDataURL(qrUrl);

      // Post data to API
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
      router.back();
    } catch (err) {
      setError('An error occurred while adding the rider. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h1>Admin Dashboard</h1>
        <h2>
          <a href="./add-rider" style={styles.link}>Add New Rider</a>
        </h2>
        <button onClick={() => router.push('/')} style={styles.button}>
          Go to Dashboard
        </button>
      </aside>

      <main style={styles.main}>
        <h1>Add Rider</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleAddRider} style={styles.form}>
          <input type="text" name="firstName" placeholder="First Name" required style={styles.input} />
          <input type="text" name="lastName" placeholder="Last Name" required style={styles.input} />
          <input type="number" name="age" placeholder="Age" required style={styles.input} />
          <select name="sex" required style={styles.input}>
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" name="bikeRegNumber" placeholder="Bike Registration Number" required style={styles.input} />
          <input type="text" name="nationalId" placeholder="National ID" required style={styles.input} />
          <button type="submit" style={styles.button}>Add Rider</button>
        </form>
      </main>
    </div>
  );
};

// Inline styles for better organization and readability
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#fff',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  link: {
    display: 'block',
    marginBottom: '20px',
    textDecoration: 'none',
    color: '#0070f3',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
  },
  main: {
    flex: 1,
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default AddRider;
