// pages/admin/index.js
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RiderList from '../../components/RiderList';

const Admin = () => (
  <div>
    <Header />
    <main>
      <h1>Admin Dashboard</h1>
      <RiderList />
    </main>
    <Footer />
  </div>
);

export default Admin;
