// pages/api/riders.js
import fs from 'fs';
import path from 'path';

const ridersFilePath = path.join(process.cwd(), 'data', 'riders.json');

export async function handler(req, res) {
  if (req.method === 'POST') {
    // Add new rider
    const { id, name, qrCode } = req.body;

    const ridersData = fs.readFileSync(ridersFilePath, 'utf8');
    const riders = JSON.parse(ridersData);

    riders.push({ id, name, qrCode });
    fs.writeFileSync(ridersFilePath, JSON.stringify(riders, null, 2));

    return res.status(201).json({ message: 'Rider added' });
  } else if (req.method === 'GET') {
    // Get all riders
    const ridersData = fs.readFileSync(ridersFilePath, 'utf8');
    return res.status(200).json(JSON.parse(ridersData));
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
