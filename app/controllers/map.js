// Initialize and add the map
function initMap() {
  // The location of the cliffs
  const cliffs = { lat: 52.9715, lng: 9.4309 };
  // The map, centered at cliffs
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: cliffs,
  });
  // The marker, positioned at cliffs
  const marker = new google.maps.Marker({
    position: cliffs,
    map: map,
  });
}



