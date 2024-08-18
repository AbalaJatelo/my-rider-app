import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'riders.json');

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { code } = req.body;

      if (!code || typeof code !== 'string') {
        return res.status(400).json({ message: 'Invalid code' });
      }

      // Read existing data
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const riders = JSON.parse(fileData);

      // Find index of rider to delete
      const index = riders.findIndex((rider) => rider.code === code);

      if (index === -1) {
        return res.status(404).json({ message: 'Rider not found' });
      }

      // Remove rider
      riders.splice(index, 1);

      // Write updated data
      fs.writeFileSync(filePath, JSON.stringify(riders, null, 2));

      res.status(200).json({ message: 'Rider deleted successfully' });
    } catch (error) {
      console.error('Error deleting rider:', error); // Log the error for debugging
      res.status(500).json({ message: 'Failed to delete rider', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
