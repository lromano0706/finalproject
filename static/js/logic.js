d3.select("#submit-input").on("click", getData);

function getData() {
  var beds = d3.select("#beds").property("value");
  var baths = d3.select("#baths").property("value");
  var yearBuilt = d3.select("#year-built").property("value");
  var sqft = d3.select("#sqft").property("value");
  var address = d3.select("#address").property("value");
  var county = d3.select("#county").property("value");
  var zip = d3.select("#zip").property("value");
  console.log(beds, baths, yearBuilt, sqft, address, county, zip);

  var values = [baths, beds, sqft, 8343];
  var valString = "";
  for (var i=0; i<values.length; i++) {
    if (i != (values.length-1)) {
      valString = valString + values[i] + "-";
    }
    else {
      valString = valString + values[i];
    }
  }
  console.log(valString)
  console.log("http://127.0.0.1:5000/estimate/" + valString);
  d3.json("http://127.0.0.1:5000/estimate/" + valString).then(function(a) {
    console.log(a);
    d3.select("#estimate").html(`$${a.toLocaleString()}`);
  }).catch(function (a) { console.log(a); });

};

// Creating map object
var myMap = L.map("myMap", {
  center: [33.7175, -117.8311],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
var complaint = "&complaint_type=Rodent";
var limit = "&$limit=10000";

// Assemble API query URL
var url = baseURL + date + complaint + limit;
console.log(url)
// Grab the data with d3
d3.json(url).then(function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
