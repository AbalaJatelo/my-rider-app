// scripts/generateRiders.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

const generateRiders = async (numRiders = 5) => {
  const riders = [];

  for (let i = 0; i < numRiders; i++) {
    const id = uuidv4(); // Generate unique ID for each rider
    const name = `Rider_${i + 1}`;
    const qrCodeUrl = `https://my-rider-app-eugenes-projects-bf3cfcc5.vercel.app/rider/${id}`;

    // Generate QR Code
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeUrl);

    riders.push({
      id,
      name,
      qrCode: qrCodeDataURL,
    });

    if (i % 1000 === 0) {
      console.log(`Generated ${i + 1} riders`);
    }
  }

  const ridersFilePath = path.join(__dirname, '../data/riders.json');

  fs.writeFileSync(ridersFilePath, JSON.stringify(riders, null, 2));
  console.log(`Successfully generated ${numRiders} riders!`);
};

generateRiders().catch(console.error);
