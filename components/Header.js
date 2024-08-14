// components/Header.js
import Link from 'next/link';

const Header = () => (
  <header>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/signup">Signup</Link>
      <Link href="/admin">Admin</Link>
    </nav>
  </header>
);

export default Header;
