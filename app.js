const mymap = L.map('issMap').setView([0, 0], 1);

const issIcon = L.icon({
  iconUrl: '200px-International_Space_Station.svg.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const issApi = 'https://api.wheretheiss.at/v1/satellites/25544';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

async function issLocation() {
  const response = await fetch(issApi);
  const data = await response.json();

  document.getElementById('lat').textContent = data.latitude;
  document.getElementById('lon').textContent = data.longitude;

  marker.setLatLng([data.latitude, data.longitude]);
}

issLocation();
