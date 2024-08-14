// scripts/generateRiders.js
import fs from 'fs';
import path from 'path';

const RIDERS_FILE = path.resolve('data/riders.json');

const generateRandomRiders = (num) => {
  const riders = [];
  for (let i = 0; i < num; i++) {
    riders.push({
      id: `R${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`,
      name: `Rider ${i + 1}`,
    });
  }
  return riders;
};

const riders = generateRandomRiders(1000000);
fs.writeFileSync(RIDERS_FILE, JSON.stringify(riders, null, 2));
console.log(`Generated ${riders.length} riders`);
