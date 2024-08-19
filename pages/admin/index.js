import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RiderList from '../../components/RiderList';

const Admin = () => (
  <div style={styles.container}>
    <Header />
    <main style={styles.mainContent}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <RiderList />
    </main>
    <Footer />
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2rem',
    color: '#001f3f',
    marginBottom: '1rem',
  },
  '@media (max-width: 1200px)': {
    mainContent: {
      padding: '0.5rem',
    },
    heading: {
      fontSize: '1.5rem',
    },
  },
  '@media (max-width: 768px)': {
    mainContent: {
      padding: '0.5rem',
      width: '95%',
    },
    heading: {
      fontSize: '1.25rem',
    },
  },
  '@media (max-width: 480px)': {
    mainContent: {
      padding: '0.25rem',
      width: '100%',
    },
    heading: {
      fontSize: '1rem',
    },
  },
};

export default Admin;
