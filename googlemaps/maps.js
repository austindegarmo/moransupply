// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();

//   const locationButton = document.createElement("button");

//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   });
// }

// console.log(pos);


// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }
//   //  Start of beggining of directions objects and services 


// function obtainDirections () {
//   // const userData  = new routeMap;
//   directionsService.route(
//     {
//             origin: pos,
//             destination: "415 40th St, Oakland, California",
//             travelMode: "DRIVING"
//     },
//     (response, status) => {
//      console.log(response);
//      console.log(status);
//     }
//   )
// }

// function calculateAndDisplayRoute(directionsService, directionsRenderer) {
//   directionsService
//     .route({
//       origin: {
//         query: document.getElementById("start").value,
//       },
//       destination: {
//         query: document.getElementById("end").value,
//       },
//       travelMode: google.maps.TravelMode.DRIVING,
//     })
//     .then((response) => {
//       directionsRenderer.setDirections(response);
//     })
//     .catch((e) => window.alert("Directions request failed due to " + status));
// }

// obtainDirections();
// calculateAndDisplayRoute();

// console.log("got to the end");
// window.initMap = initMap;




function initMap() {
  // Create a map object and set the initial location to Oakland, CA
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.8044, lng: -122.2711},
    zoom: 14
  });

  // Create a directions service object and set the destination to 415 40th St, Oakland, CA
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  var destination = '415 40th St, Oakland, CA';

  // Get the user's current location using the Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // Set the origin and destination for the directions request
      var request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
      };

      // Send the directions request to the Directions service
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          // Display the directions on the map
          directionsRenderer.setDirections(result);
        }
      });
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}