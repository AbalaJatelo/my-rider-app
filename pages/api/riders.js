// pages/api/riders.js
import fs from 'fs';
import path from 'path';

const RIDERS_FILE = path.resolve('data/riders.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let riders = [];
    try {
      riders = JSON.parse(fs.readFileSync(RIDERS_FILE, 'utf-8'));
    } catch (err) {
      riders = [];
    }
    res.status(200).json(riders);
  } else if (req.method === 'POST') {
    const { id, name } = req.body;
    let riders = [];
    try {
      riders = JSON.parse(fs.readFileSync(RIDERS_FILE, 'utf-8'));
    } catch (err) {
      riders = [];
    }
    riders.push({ id, name });
    fs.writeFileSync(RIDERS_FILE, JSON.stringify(riders, null, 2));
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
