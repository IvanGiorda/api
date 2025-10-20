const https = require('https');

const VIN = '5UXWX7C5BA'; // Ejemplo de VIN
const YEAR = 2011;

const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${VIN}?format=json&modelyear=${YEAR}`;

https.get(url, (res) => {
  let data = '';

  // Recibir los datos
  res.on('data', chunk => data += chunk);

  // Cuando termina la respuesta
  res.on('end', () => {
    const result = JSON.parse(data);
    console.log(result);
  });
}).on('error', (err) => {
  console.error('Error: ' + err.message);
});
