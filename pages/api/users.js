// pages/api/users.js
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, isAdmin } = req.body;

    // Read existing users
    let users = [];
    try {
      const usersData = fs.readFileSync(usersFilePath, 'utf8');
      users = JSON.parse(usersData);
    } catch (err) {
      // File may not exist yet
    }

    // Check if user exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Add new user
    const newUser = { email, password, isAdmin };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return res.status(201).json({ message: 'User created' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
