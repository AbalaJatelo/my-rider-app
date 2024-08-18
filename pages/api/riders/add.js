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
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('QR code generation error:', err);
    throw new Error('Failed to generate QR code');
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, age, sex, bikeRegNumber, nationalId } = req.body;

      // Validate input
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Invalid name' });
      }
      if (!age || typeof age !== 'number') {
        return res.status(400).json({ message: 'Invalid age' });
      }
      if (!sex || !['male', 'female', 'other'].includes(sex.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid sex' });
      }
      if (!bikeRegNumber || typeof bikeRegNumber !== 'string' || bikeRegNumber.trim() === '') {
        return res.status(400).json({ message: 'Invalid bike registration number' });
      }
      if (!nationalId || typeof nationalId !== 'string' || nationalId.trim() === '') {
        return res.status(400).json({ message: 'Invalid national ID' });
      }

      const code = generateCode();
      const qrCode = await generateQRCode(`https://my-rider-app.vercel.app/riders/${code}`);

      const newRider = {
        name: name.trim(),
        age,
        sex,
        bikeRegNumber,
        nationalId,
        code,
        qrCode,
      };

      // Read existing data
      let riders = [];
      try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        riders = JSON.parse(fileData);
      } catch (readError) {
        console.error('File read error:', readError);
      }

      // Add new rider
      riders.push(newRider);

      // Write updated data
      try {
        fs.writeFileSync(filePath, JSON.stringify(riders, null, 2));
      } catch (writeError) {
        console.error('File write error:', writeError);
        throw new Error('Failed to write to file');
      }

      res.status(200).json({ message: 'Rider added successfully', rider: newRider });
    } catch (error) {
      console.error('Error details:', error);
      res.status(500).json({ message: 'Failed to add rider', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
