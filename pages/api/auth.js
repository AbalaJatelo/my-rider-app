// pages/api/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.resolve('data/users.json');
const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, isAdmin } = req.body;
    let users = [];
    try {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    } catch (err) {
      users = [];
    }

    if (req.headers['authorization']) {
      // Handle login
      const token = req.headers['authorization'].split(' ')[1];
      try {
        jwt.verify(token, SECRET_KEY);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
      }
    } else {
      // Handle signup
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ email, password: hashedPassword, isAdmin });
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
      const token = jwt.sign({ email, isAdmin }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ success: true, token });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
