import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaArrowRight } from 'react-icons/fa'; // Example React Icon

export default function Home() {
  return (
    <div style={styles.pageContainer}>
      <Header />

      <main style={styles.mainContent}>
        <div style={styles.card}>
          <h1 style={styles.heading}>
            Welcome to the Rider Management System
          </h1>
          <p style={styles.subheading}>
            Manage and organize your riders efficiently with our easy-to-use system.
          </p>
          <a href="/admin" style={styles.ctaButton}>
            Go to Dashboard <FaArrowRight style={styles.icon} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  card: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#0070f3', // Updated to #0070f3
    marginBottom: '20px',
  },
  subheading: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '30px',
  },
  ctaButton: {
    backgroundColor: '#0070f3', // Updated to #0070f3
    color: '#fff',
    padding: '15px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    marginLeft: '10px',
    fontSize: '1.2rem',
    color: '#fff', // Same as button text color
  },
};
