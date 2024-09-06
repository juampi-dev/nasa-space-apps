const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.spaceappschallenge.org/nasa-space-apps-2024/challenges/';

axios.get(url).then(response => {
  const $ = cheerio.load(response.data);
  const challenges = [];

  // Ajustar selectores según las clases y estructura HTML
  $('.listing_link__wBcFK').each((index, element) => {
    const title = $(element).find('h3').text().trim();
    const description = $(element).find('p').text().trim();
    const difficulty = $(element).find('.difficulty-class').text().trim();  // Ajusta según HTML

    challenges.push({
      title,
      description,
      difficulty
    });
  });

  // Guarda los datos en un archivo JSON
  fs.writeFileSync('challenges.json', JSON.stringify(challenges, null, 2), 'utf-8');
  console.log('Datos guardados en challenges.json');
}).catch(error => {
  console.error('Error al realizar el scraping:', error);
});
