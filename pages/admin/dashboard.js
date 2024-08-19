import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaSignOutAlt, FaUserPlus, FaTrash, FaEye } from 'react-icons/fa';

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
        <div style={styles.pageContainer}>
            <Header />

            <div style={styles.mainContainer}>
                {/* Sidebar */}
                <aside style={styles.sidebar}>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <a href="./add-rider" style={styles.link}>
                        <FaUserPlus style={styles.icon} /> Add New Rider
                    </a>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        <FaSignOutAlt style={styles.icon} /> Logout
                    </button>
                </aside>

                {/* Main content */}
                <main style={styles.mainContent}>
                    <h2>Riders List</h2>
                    <input
                        type="text"
                        placeholder="Search riders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    
                    {searchQuery && filteredRiders.length > 0 ? (
                        <ul style={styles.riderList}>
                            {filteredRiders.map((rider) => (
                                <li key={rider.code} style={styles.riderItem}>
                                    <span style={styles.riderInfo}>{rider.name} - {rider.code}</span>
                                    <img src={rider.qrCode} alt={`QR code for ${rider.code}`} style={styles.qrCode} />
                                    <button onClick={() => handleSelectRider(rider)} style={styles.detailButton}>
                                        <FaEye style={styles.icon} /> View Details
                                    </button>
                                    <button onClick={() => handleDeleteRider(rider.code)} style={styles.deleteButton}>
                                        <FaTrash style={styles.icon} /> Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={styles.noResults}>{searchQuery ? 'No riders found.' : 'Enter a search query to find riders.'}</p>
                    )}

                    {selectedRider && (
                        <div style={styles.detailsCard}>
                            <h3>Rider Details</h3>
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Code:</strong> {selectedRider.code}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>Sex:</strong> {selectedRider.sex}</p>
                            <p><strong>Bike Registration Number:</strong> {selectedRider.bikeRegNumber}</p>
                            <p><strong>National ID:</strong> {selectedRider.nationalId}</p>
                            <img src={selectedRider.qrCode} alt={`QR code for ${selectedRider.code}`} style={styles.detailsQrCode} />
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    mainContainer: {
        display: 'flex',
        flex: 1,
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#e3f2fd', // Light blue background
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        color: '#0288d1', // Darker blue for text
    },
    link: {
        display: 'block',
        marginBottom: '20px',
        textDecoration: 'none',
        color: '#0288d1', // Darker blue for link
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    logoutButton: {
        backgroundColor: '#0288d1', // Darker blue for button
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        marginTop: 'auto',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
    },
    searchInput: {
        marginBottom: '20px',
        padding: '8px',
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    riderList: {
        listStyle: 'none',
        padding: 0,
    },
    riderItem: {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        gap: '10px',
    },
    riderInfo: {
        flex: 1,
    },
    qrCode: {
        width: '50px',
        height: '50px',
    },
    detailButton: {
        backgroundColor: '#0288d1', // Darker blue for button
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    deleteButton: {
        backgroundColor: '#0288d1', // Darker blue for button
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    noResults: {
        color: '#888',
    },
    detailsCard: {
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    detailsQrCode: {
        width: '100px',
        height: 'auto',
        marginTop: '10px',
    },
    icon: {
        marginRight: '0.5rem',
    },
};

export default Dashboard;
