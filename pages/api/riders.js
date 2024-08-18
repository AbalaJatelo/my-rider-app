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
    const { id, name, age, sex, bikeRegNumber, nationalId, qrCode } = req.body;
    let riders = [];
    try {
      riders = JSON.parse(fs.readFileSync(RIDERS_FILE, 'utf-8'));
    } catch (err) {
      riders = [];
    }
    // Ensure the new rider has all required fields
    if (!id || !name || !age || !sex || !bikeRegNumber || !nationalId || !qrCode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Add the new rider
    riders.push({ id, name, age, sex, bikeRegNumber, nationalId, qrCode });
    fs.writeFileSync(RIDERS_FILE, JSON.stringify(riders, null, 2));
    res.status(200).json({ success: true, rider: { id, name, age, sex, bikeRegNumber, nationalId, qrCode } });
  } else if (req.method === 'DELETE') {
    const { code } = req.body;
    let riders = [];
    try {
      riders = JSON.parse(fs.readFileSync(RIDERS_FILE, 'utf-8'));
    } catch (err) {
      riders = [];
    }
    riders = riders.filter(rider => rider.code !== code);
    fs.writeFileSync(RIDERS_FILE, JSON.stringify(riders, null, 2));
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
