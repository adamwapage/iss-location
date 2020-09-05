// Making a map and tiles
const mymap = L.map('issMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making an marker with a custom icon
const issIcon = L.icon({
  iconUrl: '200px-International_Space_Station.svg.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
const issApi = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

async function issLocation() {
  const response = await fetch(issApi);
  const data = await response.json();

  document.getElementById('lat').textContent = data.latitude.toFixed(2);
  document.getElementById('lon').textContent = data.longitude.toFixed(2);

  marker.setLatLng([data.latitude, data.longitude]);
  if (firstTime) {
    mymap.setView([data.latitude, data.longitude], 2);
    firstTime = false;
  }
}

issLocation();

setInterval(issLocation, 1000);
