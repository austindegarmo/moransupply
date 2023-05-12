// let map, infoWindow;
// let directionsService, directionsRenderer;

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
//           console.log(pos)  
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
//   DirectionsService.route(
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

// // obtainDirections();
// calculateAndDisplayRoute();

// console.log("got to the end");
// window.initMap = initMap;


// Function to initialize the map
function initMap() {
  // Create a map object and specify the DOM element for display
  var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.8123035, lng: -122.2706075 }, // Centered on Oakland, CA
      zoom: 13
  });

  // Create a directions service object
  var directionsService = new google.maps.DirectionsService();

  // Create a directions renderer object
  var directionsDisplay = new google.maps.DirectionsRenderer();

  // Bind the directions renderer to the map
  directionsDisplay.setMap(map);

  // Get the user's current location
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };

          // Set the origin for directions to the user's location
          var origin = new google.maps.LatLng(pos.lat, pos.lng);

          // Set the destination for directions
          var destination = '415 40th St, Oakland, CA';

          // Define the request object for directions
          var request = {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING
          };

          // Call the directions service to get directions
          directionsService.route(request, function (response, status) {
              if (status === 'OK') {
                  // Display the directions on the map
                  directionsDisplay.setDirections(response);

                  var steps = response.routes[0].legs[0].steps;
                  var directionsList = document.getElementById('directions-list');

                  for (var i=0; i < steps.length; i++) {
                    var listItem = document.createElement('li');
                    listItem.innerHTML = steps[i].instructions;
                    directionsList.appendChild(listItem);
                  }
              } else {
                  // Handle error cases
                  window.alert('Directions request failed due to ' + status);
              }
          });
      }, function () {
          // Handle geolocation errors
          window.alert('Error: The Geolocation service failed.');
      });
  } else {
      // Browser doesn't support geolocation
      window.alert('Error: Your browser doesn\'t support geolocation.');
  }
}