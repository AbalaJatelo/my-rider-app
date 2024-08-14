// pages/auth/signup.js
import AuthForm from '../../components/AuthForm';

const handleSignup = async ({ email, password, isAdmin }) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, isAdmin }),
  });

  if (response.ok) {
    window.location.href = '/auth/login';
  } else {
    const result = await response.json();
    alert(result.message || 'Failed to sign up');
  }
};

const Signup = () => (
  <div>
    <h2>Sign Up</h2>
    <AuthForm onSubmit={handleSignup} isSignup />
  </div>
);

export default Signup;
