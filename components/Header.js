// components/Header.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaSignInAlt, FaUserPlus, FaUserShield } from 'react-icons/fa';

const Header = () => {
  const router = useRouter();

  const headerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#0070f3',
    fontSize: '1rem',
    transition: 'color 0.3s, font-weight 0.3s',
  };

  const activeLinkStyle = {
    fontWeight: 'bold',
    color: '#001f3f',
  };

  const linkHoverStyle = {
    color: 'orange',
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href="/" style={{ ...linkStyle, ...(router.pathname === '/' ? activeLinkStyle : {}), ':hover': linkHoverStyle }}>
          <FaHome style={{ marginRight: '0.5rem' }} />
          Home
        </Link>
        <Link href="/auth/login" style={{ ...linkStyle, ...(router.pathname === '/auth/login' ? activeLinkStyle : {}), ':hover': linkHoverStyle }}>
          <FaSignInAlt style={{ marginRight: '0.5rem' }} />
          Login
        </Link>
        <Link href="/auth/signup" style={{ ...linkStyle, ...(router.pathname === '/auth/signup' ? activeLinkStyle : {}), ':hover': linkHoverStyle }}>
          <FaUserPlus style={{ marginRight: '0.5rem' }} />
          Signup
        </Link>
        <Link href="/admin" style={{ ...linkStyle, ...(router.pathname === '/admin' ? activeLinkStyle : {}), ':hover': linkHoverStyle }}>
          <FaUserShield style={{ marginRight: '0.5rem' }} />
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
