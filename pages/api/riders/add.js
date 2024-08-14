import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import QRCode from 'qrcode';

const filePath = path.join(process.cwd(), 'data', 'riders.json');

// Function to generate a unique 8-character alphanumeric code
const generateCode = () => {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

// Function to generate QR code
const generateQRCode = async (text) => {
  try {
    return await QRCode.toDataURL(text); // Generates a QR code as a data URL
  } catch (err) {
    throw new Error('Failed to generate QR code');
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body;

      // Validate input
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Invalid name' });
      }

      const code = generateCode();
      const qrCode = await generateQRCode(code); // Generate QR code

      const newRider = {
        name: name.trim(),
        code,
        qrCode, // Include QR code in rider data
      };

      // Read existing data
      const fileData = fs.readFileSync(filePath);
      const riders = JSON.parse(fileData);

      // Add new rider
      riders.push(newRider);

      // Write updated data
      fs.writeFileSync(filePath, JSON.stringify(riders, null, 2));

      res.status(200).json({ message: 'Rider added successfully', rider: newRider });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add rider', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
