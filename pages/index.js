import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: '20px',
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h1 style={{ fontSize: '2.5rem', color: '#FF6600', marginBottom: '20px' }}>
            Welcome to the Rider Management System
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '30px' }}>
            Manage and organize your riders efficiently with our easy-to-use system.
          </p>
          <a href="/admin" style={{
            backgroundColor: '#FF6600',
            color: '#fff',
            padding: '15px 25px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'inline-block',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
          }}>
            Go to Dashboard
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
