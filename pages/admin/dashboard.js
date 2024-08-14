import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();
    const [riders, setRiders] = useState([]);
    const [riderName, setRiderName] = useState('');
    const [newRider, setNewRider] = useState(null);

    useEffect(() => {
        // Fetch riders here
        fetch('/api/riders')
            .then((response) => response.json())
            .then((data) => setRiders(data))
            .catch((error) => console.error('Error fetching riders:', error));
    }, []);

    // Add new rider function
    const handleAddRider = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/riders/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: riderName }),
        });

        if (response.ok) {
            const result = await response.json();
            setNewRider(result.rider); // Set the newly added rider
            alert('Rider added successfully');
            // Fetch the updated list of riders
            const updatedRiders = await fetch('/api/riders').then((res) => res.json());
            setRiders(updatedRiders);
            setRiderName('');
        } else {
            alert('Failed to add rider');
        }
    };

    // Delete rider function
    const handleDeleteRider = async (code) => {
        const response = await fetch('/api/riders/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });

        if (response.ok) {
            alert('Rider deleted successfully');
            // Fetch the updated list of riders
            const updatedRiders = await fetch('/api/riders').then((res) => res.json());
            setRiders(updatedRiders);
        } else {
            alert('Failed to delete rider');
        }
    };

    // Logout function
    const handleLogout = () => {
        // Handle logout (clear cookies, tokens, etc.)
        router.push('/auth/login');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>

            <h2>Add Rider</h2>
            <form onSubmit={handleAddRider}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={riderName}
                        onChange={(e) => setRiderName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Rider</button>
            </form>

            {newRider && (
                <div>
                    <h3>New Rider Added</h3>
                    <p>Name: {newRider.name}</p>
                    <p>Code: {newRider.code}</p>
                    <img src={newRider.qrCode} alt={`QR code for ${newRider.code}`} />
                </div>
            )}

            <h2>Riders List</h2>
            <ul>
                {riders.map((rider) => (
                    <li key={rider.code}>
                        {rider.name} - {rider.code}
                        <img src={rider.qrCode} alt={`QR code for ${rider.code}`} style={{ marginLeft: '10px', width: '50px', height: '50px' }} />
                        <button onClick={() => handleDeleteRider(rider.code)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
