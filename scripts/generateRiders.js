const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const crypto = require('crypto');

// Function to generate a unique and consistent alphanumeric ID based on a string
const generateConsistentId = (input, length = 8) => {
  const hash = crypto.createHash('sha256').update(input).digest('hex');
  return hash.slice(0, length).toUpperCase(); // Take the first `length` characters and convert to uppercase
};

// Function to generate random data
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Sample data for random generation
const sexes = ['Male', 'Female'];
const bikeRegPrefixes = ['ABC', 'XYZ', '123', 'DEF'];

// Generate rider data with a numerical count
const generateRiders = async (numRiders = 1000) => {
  const riders = [];
  const baseUrl = 'http://okadamonipot.com'; // Base URL for redirection

  for (let i = 1; i <= numRiders; i++) {
    const name = `Rider ${i}`; // Generate rider name as "Rider X"
    const age = getRandomInt(18, 65); // Generate random age between 18 and 65
    const sex = getRandomElement(sexes); // Randomly choose sex
    const bikeRegNumber = `${getRandomElement(bikeRegPrefixes)}-${getRandomInt(1000, 9999)}`; // Generate bike registration number
    const nationalId = `${getRandomInt(100000000, 999999999)}`; // Generate random national ID
    
    // Generate a consistent ID based on the rider's name and national ID
    const id = generateConsistentId(`${name}-${nationalId}`);

    // Create the URL for the QR code to redirect to
    const qrCodeUrl = `${baseUrl}/${id}`;

    // Generate QR Code with URL
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeUrl);

    riders.push({
      id,
      name,
      age,
      sex,
      bikeRegNumber,
      nationalId,
      qrCode: qrCodeDataURL,
    });

    if (i % 1000 === 0) {
      console.log(`Generated ${i} riders`);
    }
  }

  const ridersFilePath = path.join(__dirname, '../data/riders.json');

  fs.writeFileSync(ridersFilePath, JSON.stringify(riders, null, 2));
  console.log(`Successfully generated ${numRiders} riders!`);
};

generateRiders().catch(console.error);
