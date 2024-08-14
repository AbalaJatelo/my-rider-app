// pages/api/login.js
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Read existing users
    let users = [];
    try {
      const usersData = fs.readFileSync(usersFilePath, 'utf8');
      users = JSON.parse(usersData);
    } catch (err) {
      return res.status(500).json({ message: 'Error reading users data' });
    }

    // Find user
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Login successful
      return res.status(200).json({ message: 'Login successful', isAdmin: user.isAdmin });
    } else {
      // Login failed
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
