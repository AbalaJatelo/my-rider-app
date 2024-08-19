// pages/auth/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header'; // Adjust the path as needed
import Footer from '../../components/Footer'; // Adjust the path as needed
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, isAdmin }),
    });

    if (response.ok) {
      router.push('/auth/login');
    } else {
      const result = await response.json();
      alert(result.message || 'Failed to sign up');
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.mainContent}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                style={styles.checkbox}
              />
              Admin
            </label>
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.text}>
          Already have an account? <button onClick={() => router.push('/auth/login')} style={styles.linkButton}>Log In</button>
        </p>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '0.5rem 1rem',
    outline: 'none',
  },
  icon: {
    margin: '0.5rem',
    color: '#0070f3',
  },
  checkboxGroup: {
    marginBottom: '1rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  button: {
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  text: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: '#0070f3',
    cursor: 'pointer',
    fontSize: '1rem',
    textDecoration: 'underline',
  },
};

export default Signup;
