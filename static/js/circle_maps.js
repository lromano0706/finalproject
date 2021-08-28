// // Use local flask API to get Medal and country data
// var local_flask = "http://127.0.0.1:5000/crimes";




// // Function to size up the radius of circle markers
// function circleSize (numOfCrimes) {
//   return numOfCrimes * 10;
// }

// var totalCrime = 0;
// var avgCrime = []; 


// // Call/Response json data from local API
// d3.json(local_flask).then(function(response) {
  
//     console.log(response[0]);
    
//     // arrays to hold medal info
//     var aggAssul = [];
//     var sexOffen = [];
//     var manslaughterNeg = [];
//     var murder = [];
//     var rape = [];
//     var robbery = [];
//     var simpAssult = [];
//     var offencesTotal = [];
//     var totalOffences = [];


//     var redIcon = new L.Icon({
//       iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
//       shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//       shadowSize: [41, 41]
//     });

//     // push all crimes into arrays
//     for (var i = 0; i < response.length; i++) {
//         if (response[i].agg_assault > 0 ) {
//             aggAssul.push(
//             L.circle([response[i].latitude, response[i].longitude], {
//               color: 'red', 
//               fillColor: '#f03',
//               fillOpacity: 0.5,
//               radius: circleSize(response[i].agg_assault)

//             })
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Aggravated Assault Cases: " + response[i].agg_assault+ "</p>")
//             );
//         } 
//           if (response[i].sex_offenses > 0 ) {
//             sexOffen.push(
//             L.circle([response[i].latitude, response[i].longitude], {
//               color: 'red', 
//               fillColor: '#f03',
//               fillOpacity: 0.5,
//               radius: circleSize(response[i].sex_offenses)

//             })
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Sex Offences Cases: " + response[i].sex_offenses + "</p>")
//             );
//           } 
//           if (response[i].manslaughter_neg > 0 ) {
//             manslaughterNeg.push(
//             L.circle([response[i].latitude, response[i].longitude], {
//               color: 'red', 
//               fillColor: '#f03',
//               fillOpacity: 0.5,
//               radius: circleSize(response[i].manslaughter_neg)

//             })
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Man Slaughter Cases: " + response[i].manslaughter_neg + "</p>")
//             );
//           } 
//           if (response[i].murder_and_nonneg_man > 0 ) {
//             murder.push(
//             L.circle([response[i].latitude, response[i].longitude], {
//               color: 'red', 
//               fillColor: '#f03',
//               fillOpacity: 0.5,
//               radius: circleSize(response[i].murder_and_nonneg_man)

//             })
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Murder Cases: " + response[i].murder_and_nonneg_man + "</p>")
//             );
//         } 
//           if (response[i].rape > 0 ) {
//             rape.push(
//             L.circle([response[i].latitude, response[i].longitude], {
//               color: 'red', 
//               fillColor: '#f03',
//               fillOpacity: 0.5,
//               radius: circleSize(response[i].rape)

//             })
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Rape Cases: " + response[i].rape + "</p>")
//             );
//           } 
//           if (response[i].robbery > 0 ) {
//             robbery.push(
//             L.circle([response[i].latitude, response[i].longitude], {
//               color: 'red', 
//               fillColor: '#f03',
//               fillOpacity: 0.5,
//               radius: circleSize(response[i].robbery)

//             })
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Robbery Cases: " + response[i].robbery + "</p>")
//             );
//           } 
//           if (response[i].simp_assault > 0 ) {
//             simpAssult.push(
//             L.circle([response[i].latitude, response[i].longitude], {
//               color: 'red', 
//               fillColor: '#f03',
//               fillOpacity: 0.5,
//               radius: circleSize(response[i].simp_assault)

//             })
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Assult Cases: " + response[i].simp_assault + "</p>")
//             );
//           } 
//           // Finally total crimes
//           if (response[i].offenses_total > 0 ) {
//             offencesTotal.push(
//             L.marker([response[i].latitude, response[i].longitude], {icon: redIcon})
//             .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Crimes: " + response[i].offenses_total + "</p>")
//             );
//           }
//           totalOffences.push(response[i].offenses_total);
 
//     }
    
//     for (var i = 0; i < totalOffences.length; i++) {
//       totalCrime += totalOffences[i];
//     }
     
//     avgCrime.push(totalCrime/totalOffences.length);



//     // Add all the cityMarkers to a new layer group.
//     var aggravatedAss = L.layerGroup(aggAssul);
//     var sexOffence = L.layerGroup(sexOffen);
//     var manSlaughter = L.layerGroup(manslaughterNeg);
//     var murderLayer = L.layerGroup(murder);
//     var rapeLayer = L.layerGroup(rape);
//     var robberyLayer = L.layerGroup(robbery);
//     var simpAssultLayer = L.layerGroup(simpAssult);
//     var totalCrimes = L.layerGroup(offencesTotal);

//     // Regular layer
//     var RegMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   });

//     // Only one base layer can be shown at a time
//     var baseMaps = {
//         "Regular": RegMap
//     };

//     // Overlays that may be toggled on or off
//     var overlayMaps = {
//     "Aggravated Assault": aggravatedAss,
//     "Sex Offences": sexOffence,
//     "Man Slaughter": manSlaughter,
//     "Simple Assault": simpAssultLayer,
//     "Murder": murderLayer,
//     "Rape": rapeLayer,
//     "Robbery": robberyLayer,
//     "Total Crimes": totalCrimes
//   };
  

//   // Create map object and set layers (Center in OC)
//   var myMap = L.map("myMap", {
//     center: [33.7175, -117.8311],
//     zoom: 10,
//     layers: [RegMap]
//   });
//   // Pass our map layers into our layer control
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps).addTo(myMap);
//   return avgCrime;
//   });
// console.log(avgCrime.length);
// console.log(avgCrime[0]);

// // setup for line chart
// const labels = ["January","February","March","April","May", "June", "July", "August", "September"," December"];
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       animations: {
//         y: {
//           duration: 2000,
//           delay: 800
//         }
//       },
//       data: {"January": 200,"February": 201,"March": 230,"April": 240 ,"May": 250, "June": 260, "July":170, "August":280, "September": 290 ," December": 200},
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(255, 159, 64, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(75, 192, 192, 1)',
//       ],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.7)',
//         'rgba(255, 159, 64, 0.7)',
//         'rgba(255, 206, 86, 0.7)',
//         'rgba(54, 162, 235, 0.7)',
//         'rgba(75, 192, 192, 0.7)',

//       ],
//       fill: 1,
//       tension: 0.5
//     },
//     {
//       label: 'Dataset 2',
//       data: {"January": 100,"February": 101,"March": 130,"April": 140 ,"May": 150, "June": 160, "July":170, "August":180, "September": 190 ," December": 200},
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(255, 159, 64, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(75, 192, 192, 1)',
//       ],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.7)',
//         'rgba(255, 159, 64, 0.7)',
//         'rgba(255, 206, 86, 0.7)',
//         'rgba(54, 162, 235, 0.7)',
//         'rgba(75, 192, 192, 0.7)',

//       ],
//     }
//   ]
// };
// // end line chart  setup


// // gauge1 set up

// var data1 = [
//   {
//     domain: { x: [0, 1], y: [0, 1] },
//     type: 'indicator',
//     mode: 'gauge',
//     value: 2,
//     title: {
//       text: 'School Review Test',
//     },
//     gauge: {
//       axis: { range: [null, 1000], tickwidth: 1, tickcolor: 'darkgrey', nticks: 11 },
//       bar: { color: 'darkgrey', thickness: 0.3 },
//       bgcolor: 'white',
//       borderwidth: 01,
//       bordercolor: 'black',
//       axes: [{
//         pointers: [{
//           type: 'Marker',
//           markerType: 'Circle'
//         }]
//       }],
//       steps: [
//         { range: [0, 100], color: 'rgba(255, 99, 132, 0.7)' },
//         { range: [1, 200], color: 'rgba(255, 159, 64, 0.7)' },
//         { range: [2, 300], color: 'rgba(255, 206, 86, 0.7)' },
//         { range: [3, 400], color: 'rgba(54, 162, 235, 0.7)' },
//         { range: [4, 500], color: 'rgba(75, 192, 192, 0.7)' },
//         { range: [5, 600], color: 'rgba(255, 99, 132, 0.7)' },
//         { range: [6, 700], color: 'rgba(255, 159, 64, 0.7)' },
//         { range: [7, 800], color: 'rgba(255, 206, 86, 0.7)' },
//         { range: [8, 900], color: 'rgba(54, 162, 235, 0.7)' },
//         { range: [9, 1000], color: 'rgba(75, 192, 192, 0.7)' },
//       ],
//       threshold: {
//         line: { color: "red", width: 4 },
//         thickness: 0.75,
//         value: 4
//       }
//     },
//   },
// ];

// var data2 = [
//   {
//     domain: { x: [0, 1], y: [0, 1] },
//     type: 'indicator',
//     mode: 'gauge',
//     value: 3,
//     title: {
//       text: 'Crime Review',
//     },
//     gauge: {
//       axis: { range: [null, 10], tickwidth: 1, tickcolor: 'darkgrey', nticks: 6 },
//       bar: { color: 'darkgrey', thickness: 0.3 },
//       bgcolor: 'white',
//       borderwidth: 01,
//       bordercolor: 'black',
//       axes: [{
//         pointers: [{
//           type: 'Marker',
//           markerType: 'Circle'
//         }]
//       }],
//       steps: [
//         { range: [0, 10], color: 'rgba(255, 99, 132, 0.7)' },
//         { range: [10, 20], color: 'rgba(255, 159, 64, 0.7)' },
//         { range: [20, 30], color: 'rgba(255, 206, 86, 0.7)' },
//         { range: [30, 40], color: 'rgba(54, 162, 235, 0.7)' },
//         { range: [40, 50], color: 'rgba(75, 192, 192, 0.7)' },
//         { range: [50, 60], color: 'rgba(255, 99, 132, 0.7)' },
//         { range: [60, 70], color: 'rgba(255, 159, 64, 0.7)' },
//         { range: [70, 80], color: 'rgba(255, 206, 86, 0.7)' },
//         { range: [80, 90], color: 'rgba(54, 162, 235, 0.7)' },
//         { range: [90, 100], color: 'rgba(75, 192, 192, 0.7)' },
//       ],
//       threshold: {
//         line: { color: "red", width: 4 },
//         thickness: 0.75,
//         value: 1
//       }
//     },
//   },
// ];




// // Layout 
// var layout = {

//   width: 316,
//   height: 180,
//   margin: { t: 45, r: 25, l: 25, b: 5 },
//   font: { color: 'black', family: 'Arial' }
// };


// // end gauge information

// // rendering gauge1 on html
// Plotly.newPlot('gauge1', data1, layout)
// // rendering gauge2 on html
// Plotly.newPlot('gauge2', data2, layout)