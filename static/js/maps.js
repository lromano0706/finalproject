// Use local flask API to get Medal and country data
var local_flask = "http://127.0.0.1:5000/crimes";


// Call/Response json data from local API
d3.json(local_flask).then(function(response) {
  
    console.log(response[0]);
    
    // arrays to hold medal info
    var aggAssul = [];
    var sexOffen = [];
    var manslaughterNeg = [];
    var murder = [];
    var rape = [];
    var robbery = [];
    var simpAssult = [];
    var offencesTotal = [];


    // push all crimes into arrays
    for (var i = 0; i < response.length; i++) {
        if (response[i].Agg_Assult > 0 ) {
            aggAssul.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Aggravated Assault Cases: " + response[i].Agg_Assult + "</p>")
            );
        } 
          if (response[i].Sex_Offences > 0 ) {
            sexOffen.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Sex Offences Cases: " + response[i].Sex_Offences + "</p>")
            );
          } 
          if (response[i].Manslaughter_Neg > 0 ) {
            manslaughterNeg.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Man Slaughter Cases: " + response[i].Manslaughter_Neg + "</p>")
            );
          } 
          if (response[i].Murder_and_Nonneg_Man > 0 ) {
            murder.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Murder Cases: " + response[i].Murder_and_Nonneg_Man + "</p>")
            );
        } 
          if (response[i].Rape > 0 ) {
            rape.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Rape Cases: " + response[i].Rape + "</p>")
            );
          } 
          if (response[i].Robbery > 0 ) {
            robbery.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Robbery Cases: " + response[i].Robbery + "</p>")
            );
          } 
          if (response[i].Simp_Assult > 0 ) {
            simpAssult.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h3>" + response[i].City + "</h3> <hr> <p>Total Assult Cases: " + response[i].Simp_Assult + "</p>")
            );
          } 
          // Finally total crimes
          if (response[i].Offences_Total > 0 ) {
            offencesTotal.push(
            L.marker([response[i].Latitude, response[i].Longitude])
            .bindPopup("<h1>" + response[i].City + "</h1> <hr> <h3>Total Crimes: " + response[i].Offences_Total + "</h3>")
            );
          }
    
    }
    // Add all the cityMarkers to a new layer group.
    var aggravatedAss = L.layerGroup(aggAssul);
    var sexOffence = L.layerGroup(sexOffen);
    var manSlaughter = L.layerGroup(manslaughterNeg);
    var murderLayer = L.layerGroup(murder);
    var rapeLayer = L.layerGroup(rape);
    var robberyLayer = L.layerGroup(robbery);
    var simpAssultLayer = L.layerGroup(simpAssult);
    var totalCrimes = L.layerGroup(offencesTotal);

    // Regular layer
    var RegMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

    // Only one base layer can be shown at a time
    var baseMaps = {
        "Regular": RegMap
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
    "Aggravated Assault": aggravatedAss,
    "Sex Offences": sexOffence,
    "Man Slaughter": manSlaughter,
    "Simple Assault": simpAssultLayer,
    "Murder": murderLayer,
    "Rape": rapeLayer,
    "Robbery": robberyLayer,
    "Total Crimes": totalCrimes
  };
  

  // Create map object and set layers (Center in OC)
  var myMap = L.map("myMap", {
    center: [33.7175, -117.8311],
    zoom: 10,
    layers: [RegMap]
  });
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
 
  });
