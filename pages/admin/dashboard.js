import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const router = useRouter();
    const [riders, setRiders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRider, setSelectedRider] = useState(null);

    useEffect(() => {
        // Fetch riders here
        fetch('/api/riders')
            .then((response) => response.json())
            .then((data) => setRiders(data))
            .catch((error) => console.error('Error fetching riders:', error));
    }, []);

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
            // Clear selected rider
            setSelectedRider(null);
        } else {
            alert('Failed to delete rider');
        }
    };

    // Logout function
    const handleLogout = () => {
        // Handle logout (clear cookies, tokens, etc.)
        router.push('/auth/login');
    };

    // Filter riders based on search query
    const filteredRiders = riders.filter(rider =>
        rider.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rider.nationalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rider.bikeRegNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle rider selection
    const handleSelectRider = (rider) => {
        setSelectedRider(rider);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
                <h1>Admin Dashboard</h1>
                <h2>
                    <a href="./add-rider" style={{ display: 'block', marginBottom: '20px', textDecoration: 'none', color: '#FF6600', fontSize: '16px' }}>Add New Rider</a>
                </h2>
                <button onClick={handleLogout} style={{ backgroundColor: '#FF6600', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px' }}>
                    Logout
                </button>
            </aside>

            {/* Main content */}
            <main style={{ flex: 1, padding: '20px' }}>
                <h2>Riders List</h2>
                <input
                    type="text"
                    placeholder="Search riders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '20px', padding: '8px', width: '100%', border: '1px solid #ddd', borderRadius: '5px' }}
                />
                
                {searchQuery && filteredRiders.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {filteredRiders.map((rider) => (
                            <li key={rider.code} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                                <span style={{ flex: 1 }}>{rider.name} - {rider.code}</span>
                                <img src={rider.qrCode} alt={`QR code for ${rider.code}`} style={{ marginLeft: '10px', width: '50px', height: '50px' }} />
                                <button onClick={() => handleSelectRider(rider)} style={{ marginLeft: '10px', backgroundColor: '#FF6600', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>View Details</button>
                                <button onClick={() => handleDeleteRider(rider.code)} style={{ marginLeft: '10px', backgroundColor: '#FF6600', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: '#888' }}>{searchQuery ? 'No riders found.' : 'Enter a search query to find riders.'}</p>
                )}

                {selectedRider && (
                    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                        <h3>Rider Details</h3>
                        <p><strong>Name:</strong> {selectedRider.name}</p>
                        <p><strong>Code:</strong> {selectedRider.code}</p>
                        <p><strong>Age:</strong> {selectedRider.age}</p>
                        <p><strong>Sex:</strong> {selectedRider.sex}</p>
                        <p><strong>Bike Registration Number:</strong> {selectedRider.bikeRegNumber}</p>
                        <p><strong>National ID:</strong> {selectedRider.nationalId}</p>
                        <img src={selectedRider.qrCode} alt={`QR code for ${selectedRider.code}`} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
