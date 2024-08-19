const Footer = () => (
  <footer style={styles.footer}>
    <p style={styles.text}>© 2024 MyApp. All rights reserved.</p>
  </footer>
);

const styles = {
  footer: {
    backgroundColor: '#0070f3',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
  },
  text: {
    margin: 0,
    fontSize: '0.875rem',
  },
};

export default Footer;
