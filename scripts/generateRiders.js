const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

// Function to generate a random alphanumeric string of a given length
const generateRandomId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

// Function to generate random data
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Sample data for random generation
const sexes = ['Male', 'Female'];
const bikeRegPrefixes = ['ABC', 'XYZ', '123', 'DEF'];
const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'Chris', 'Jessica', 'Matthew', 'Amanda', 'David', 'Sarah'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'García', 'Rodriguez', 'Martínez'];

const generateRiders = async (numRiders = 4) => {
  const riders = [];

  for (let i = 0; i < numRiders; i++) {
    const id = generateRandomId(8); // Generate 8-bit alphanumeric ID
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const name = `${firstName} ${lastName}`; // Combine first and last name
    const age = getRandomInt(18, 65); // Generate random age between 18 and 65
    const sex = getRandomElement(sexes); // Randomly choose sex
    const bikeRegNumber = `${getRandomElement(bikeRegPrefixes)}-${getRandomInt(1000, 9999)}`; // Generate bike registration number
    const nationalId = `${getRandomInt(100000000, 999999999)}`; // Generate random national ID

    const qrCodeUrl = `https://my-rider-app-eugenes-projects-bf3cfcc5.vercel.app/rider/${id}`;

    // Generate QR Code
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
      console.log(`Generated ${i + 1} riders`);
    }
  }

  const ridersFilePath = path.join(__dirname, '../data/riders.json');

  fs.writeFileSync(ridersFilePath, JSON.stringify(riders, null, 2));
  console.log(`Successfully generated ${numRiders} riders!`);
};

generateRiders().catch(console.error);
