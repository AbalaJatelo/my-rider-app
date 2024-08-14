// pages/api/riders.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const ridersFilePath = path.join(process.cwd(), 'data', 'riders.json');
            const fileContents = fs.existsSync(ridersFilePath)
                ? fs.readFileSync(ridersFilePath, 'utf-8')
                : '[]';

            const riders = JSON.parse(fileContents);
            const newRider = req.body;

            riders.push(newRider);

            fs.writeFileSync(ridersFilePath, JSON.stringify(riders, null, 2));

            res.status(200).json({ message: 'Rider added successfully!' });
        } catch (error) {
            console.error('Failed to add rider:', error);
            res.status(500).json({ error: 'Failed to add rider' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
