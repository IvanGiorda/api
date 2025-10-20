document.getElementById('buscar').addEventListener('click', async () => {
  const vin = document.getElementById('vin').value.trim();
  const year = document.getElementById('year').value.trim();
  const tabla = document.getElementById('tabla');
  const body = document.getElementById('tabla-body');
  const error = document.getElementById('error');

  if (!vin) {
    error.textContent = 'Por favor, ingresá un VIN.';
    tabla.style.display = 'none';
    return;
  }

  error.textContent = '';
  tabla.style.display = 'none';
  body.innerHTML = `<tr><td colspan="2">Cargando...</td></tr>`;

  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json${year ? '&modelyear=' + year : ''}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const info = data.Results[0];

    if (!info.Make) {
      error.textContent = 'VIN no encontrado o inválido.';
      return;
    }

    body.innerHTML = `
      <tr><td><b>VIN</b></td><td>${info.VIN || 'No disponible'}</td></tr>
      <tr><td><b>Marca</b></td><td>${info.Make || 'No disponible'}</td></tr>
      <tr><td><b>Modelo</b></td><td>${info.Model || 'No disponible'}</td></tr>
      <tr><td><b>Año</b></td><td>${info.ModelYear || 'No disponible'}</td></tr>
      <tr><td><b>Clase</b></td><td>${info.BodyClass || 'No disponible'}</td></tr>
      <tr><td><b>Combustible</b></td><td>${info.FuelTypePrimary || 'No disponible'}</td></tr>
      <tr><td><b>Motor</b></td><td>${info.EngineModel || 'No disponible'}</td></tr>
    `;
    tabla.style.display = 'table';
  } catch (err) {
    error.textContent = 'Error al obtener los datos: ' + err;
    tabla.style.display = 'none';
  }
});
