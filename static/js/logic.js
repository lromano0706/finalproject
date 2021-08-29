d3.select("#submit-input").on("click", getData);

var cities = ['Aliso Viejo', 'Anaheim', 'Brea', 'Buena Park', 'Costa Mesa',
  'Cypress', 'Dana Point', 'Fountain Valley', 'Fullerton', 'Garden Grove',
  'Huntington Beach', 'Irvine', 'La Habra', 'La Palma', 'Laguna Beach',
  'Laguna Hills', 'Laguna Niguel', 'Lake Forest', 'Los Alamitos',
  'Mission Viejo', 'Newport Beach', 'Orange', 'Placentia',
  'Rancho Santa Margarita', 'San Clemente', 'San Juan Capistrano',
  'Santa Ana', 'Seal Beach', 'Stanton', 'Tustin', 'Villa Park',
  'Westminster', 'Yorba Linda'];
var zips = ['90620', '90621', '90623', '90630', '90631', '90680', '90720', '90740',
  '92602', '92603', '92604', '92606', '92610', '92612', '92614', '92618', '92620',
  '92624', '92626', '92627', '92629', '92630', '92646', '92647', '92648', '92649',
  '92651', '92653', '92656', '92660', '92661', '92663', '92672', '92673', '92675',
  '92677', '92679', '92683', '92688', '92691', '92692', '92701', '92703', '92704',
  '92705', '92706', '92707', '92708', '92780', '92782', '92801', '92802', '92804',
  '92805', '92806', '92807', '92821', '92823', '92831', '92832', '92833', '92835',
  '92840', '92841', '92843', '92844', '92845', '92861', '92865', '92866', '92867',
  '92868', '92869', '92870', '92886', '92887'];
var schoolRatings = ['2.333', '2.667', '3.0', '3.333', '3.667', '4.0', '4.333', '4.4',
  '4.429', '4.6', '4.667', '4.75', '4.833', '5.0', '5.25', '5.333', '5.5', '5.667',
  '5.75', '6.0', '6.25', '6.333', '6.5', '6.667', '6.75', '7.0', '7.25', '7.333',
  '7.667', '7.75', '8.0', '8.2', '8.25', '8.333', '8.5', '8.667', '8.75', '9.0', '9.333'];

function getData() {
  d3.json(local_flask2).then(function(response) {
      var beds = d3.select("#beds").property("value");
      var baths = d3.select("#baths").property("value");
      var yearBuilt = d3.select("#year-built").property("value");
      var sqft = d3.select("#sqft").property("value");
      var zip = d3.select("#zip").property("value");
      var city = d3.select("#city").property("value");
      var schoolRating = d3.select("#school-rating").property("value");
      var lotSize = d3.select("#lot-size").property("value");
      var daysOnMarket = d3.select("#days-on-market").property("value");
      var lat = d3.select("#lat").property("value");
      var lng = d3.select("#lng").property("value");
      
      var crime = 0;
      for (var i=0; i<response.length; i++) {
        if (response[i].city == city) {
          crime = response[i].crime_per_capita_1000s;
          break;
        }
      }
  
      var values = [4, 2.5, 1400, 2000, 2000, 10, 33.7175, -117.8311, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var numInputs = [beds, baths, sqft, lotSize, yearBuilt, daysOnMarket, lat, lng];
    
      for (var i = 0; i < numInputs.length; i++) {
        if (numInputs[i] != "") {
          values[i] = numInputs[i];
        }
      }
    
      values[8] = crime;
      values[cities.indexOf(city) + 9] = 1;
      values[zips.indexOf(zip) + 42] = 1;
      values[schoolRatings.indexOf(schoolRating) + 118] = 1;
    
      console.log(values);
    
      var valString = "";
      for (var i = 0; i < values.length; i++) {
        if (i != (values.length - 1)) {
          valString = valString + values[i] + "+";
        }
        else {
          valString = valString + values[i];
        }
      }
      console.log(valString)
      console.log("http://127.0.0.1:5000/estimate/" + valString);
      d3.json("http://127.0.0.1:5000/estimate/" + valString).then(function (a) {
        console.log(a);
        d3.select("#estimate").html(`$${a.toLocaleString()}`);
      }).catch(function (a) { console.log(a); });
    
  })
};




// Use local flask API to get Medal and country data
var local_flask = "http://127.0.0.1:5000/crimes";
var local_flask2 = "http://127.0.0.1:5000/houses";



// Function to size up the radius of circle markers
function circleSize(numOfCrimes) {
  return numOfCrimes * 10;
}
//school ratings
var schoolRating = [];
var schools_unique = [];
var schools = [];
var averageSchool = 0

d3.json(local_flask2).then(function (response) {
  console.log(response[0]);
  schoolRating = response.map(function (X) { return { city: X.city, average_school_rating: X.average_school_rating } });
  schools_unique = schoolRating.map(function (X) { return X.city });
  schools_unique = [...new Set(schools_unique)].filter(x => x);
  schools_unique.forEach(function (next_city) {
    temp = schoolRating.filter(c => c.city == next_city);
    temp = temp.map(function (x) { return +x.average_school_rating }).filter(x => x);
    temp = temp.reduce((a, b) => a + b) / temp.length;
    schools.push({ city: next_city, average_school_rating: temp });
  });
  console.log(schools);
  totalSchoolRating = response.map(function (x) {
    return +x.average_school_rating
  });

  averageSchool = totalSchoolRating.filter(x => x).reduce((a, b) => a + b) / totalSchoolRating.length
  console.log('calculated average school', averageSchool)
});

// Call/Response json data from local API
d3.json(local_flask).then(function (response) {

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
  var totalOffences = [];
  var city = []

  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // push all crimes into arrays
  for (var i = 0; i < response.length; i++) {
    if (response[i].agg_assault > 0) {
      aggAssul.push(
        L.circle([response[i].latitude, response[i].longitude], {
          color: 'rgba(255, 159, 64, 0.7)',
          fillColor: 'rgba(255, 159, 64, 0.7)',
          fillOpacity: 0.5,
          radius: circleSize(response[i].agg_assault)

        })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Aggravated Assault Cases: " + response[i].agg_assault + "</p>")
      );
    }
    if (response[i].sex_offenses > 0) {
      sexOffen.push(
        L.circle([response[i].latitude, response[i].longitude], {
          color: 'rgba(255, 99, 132, 0.7)',
          fillColor: 'rgba(255, 99, 132, 0.7)',
          fillOpacity: 0.5,
          radius: circleSize(response[i].sex_offenses)

        })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Sex Offences Cases: " + response[i].sex_offenses + "</p>")
      );
    }
    if (response[i].manslaughter_neg > 0) {
      manslaughterNeg.push(
        L.circle([response[i].latitude, response[i].longitude], {
          color: 'rgba(75, 192, 192, 0.7)',
          fillColor: 'rgba(75, 192, 192, 0.7)',
          fillOpacity: 0.5,
          radius: circleSize(response[i].manslaughter_neg)

        })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Total Man Slaughter Cases: " + response[i].manslaughter_neg + "</p>")
      );
    }
    if (response[i].murder_and_nonneg_man > 0) {
      murder.push(
        L.circle([response[i].latitude, response[i].longitude], {
          color: 'rgba(54, 162, 235, 0.7)',
          fillColor: 'rgba(54, 162, 235, 0.7)',
          fillOpacity: 0.5,
          radius: circleSize(response[i].murder_and_nonneg_man)

        })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Total Murder Cases: " + response[i].murder_and_nonneg_man + "</p>")
      );
    }
    if (response[i].rape > 0) {
      rape.push(
        L.circle([response[i].latitude, response[i].longitude], {
          color: 'rgba(255, 206, 86, 0.7)',
          fillColor: 'rgba(255, 206, 86, 0.7)',
          fillOpacity: 0.5,
          radius: circleSize(response[i].rape)

        })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Total Rape Cases: " + response[i].rape + "</p>")
      );
    }
    if (response[i].robbery > 0) {
      robbery.push(
        L.circle([response[i].latitude, response[i].longitude], {
          color: 'rgba(255, 159, 64, 0.7)',
          fillColor: 'rgba(255, 159, 64, 0.7)',
          fillOpacity: 0.5,
          radius: circleSize(response[i].robbery)

        })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Total Robbery Cases: " + response[i].robbery + "</p>")
      );
    }
    if (response[i].simp_assault > 0) {
      simpAssult.push(
        L.circle([response[i].latitude, response[i].longitude], {
          color: 'rgba(255, 99, 132, 0.7)',
          fillColor: 'rgba(255, 99, 132, 0.7)',
          fillOpacity: 0.5,
          radius: circleSize(response[i].simp_assault)

        })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Total Assult Cases: " + response[i].simp_assault + "</p>")
      );
    }
    if (response[i].city) {
      city.push(response[i].city)
    }
    // Finally total crimes
    if (response[i].offenses_total > 0) {
      offencesTotal.push(
        L.marker([response[i].latitude, response[i].longitude], { icon: redIcon, totalCrime: response[i].offenses_total, city: response[i].city })
          .bindPopup("<h3>" + response[i].city + "</h3> <hr> <p>Total Crimes: " + response[i].offenses_total + "</p>")
          .on("click", function () {
            getGauge(this.options.totalCrime);
            getGauge2(this.options.city);
            console.log(this.options.totalCrime);

          })
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
    "City": totalCrimes,
    "Aggrav Assult": aggravatedAss,
    "Sex Offence": sexOffence,
    "Man Slaughter": manSlaughter,
    "Simp Assult": simpAssultLayer,
    "Murder": murderLayer,
    "Rape": rapeLayer,
    "Robbery": robberyLayer

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


// setup for line chart
const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", " December"];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      animations: {
        y: {
          duration: 2000,
          delay: 800
        }
      },
      data: { "January": 200, "February": 201, "March": 230, "April": 240, "May": 250, "June": 260, "July": 170, "August": 280, "September": 290, " December": 200 },
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',

      ],
      fill: 1,
      tension: 0.5
    },
    {
      label: 'Dataset 2',
      data: { "January": 100, "February": 101, "March": 130, "April": 140, "May": 150, "June": 160, "July": 170, "August": 180, "September": 190, " December": 200 },
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',

      ],
    }
  ]
};
// end line chart  setup


// gauge1 set up
function getGauge2(currentCity) {

  school_rating = schools.filter(x => x.city == currentCity);
  if (school_rating.length == 0)
    school_rating.push(0);

  var data1 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      type: 'indicator',
      mode: 'gauge+number+delta',
      value: school_rating[0].average_school_rating,
      title: {
        text: 'School Review',
      },
      delta: { "reference": averageSchool, "valueformat": ".0f" },
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: 'darkgrey', nticks: 11 },
        bar: { color: 'darkgrey', thickness: 0.3 },
        bgcolor: 'white',
        borderwidth: 01,
        bordercolor: 'black',
        axes: [{
          pointers: [{
            type: 'Marker',
            markerType: 'Circle'
          }]
        }],
        steps: [
          { range: [0, 1], color: 'rgba(255, 99, 132, 0.7)' },
          { range: [1, 2], color: 'rgba(255, 159, 64, 0.7)' },
          { range: [2, 3], color: 'rgba(255, 206, 86, 0.7)' },
          { range: [3, 4], color: 'rgba(54, 162, 235, 0.7)' },
          { range: [4, 5], color: 'rgba(75, 192, 192, 0.7)' },
          { range: [5, 6], color: 'rgba(255, 99, 132, 0.7)' },
          { range: [6, 7], color: 'rgba(255, 159, 64, 0.7)' },
          { range: [7, 8], color: 'rgba(255, 206, 86, 0.7)' },
          { range: [8, 9], color: 'rgba(54, 162, 235, 0.7)' },
          { range: [9, 10], color: 'rgba(75, 192, 192, 0.7)' },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: averageSchool
        }
      },
    },
  ];

  // Layout 
  var layout = {

    width: 316,
    height: 180,
    margin: { t: 45, r: 20, l: 20, b: 5 },
    font: { color: 'black', family: 'Arial' }
  };
  // rendering gauge1 on html
  Plotly.newPlot('gauge1', data1, layout)
};

getGauge2();

// gauge 2 setup 
function getGauge(totalCrime) {
  var total = 0

  d3.json(local_flask)
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        total += data[i].offenses_total;
      };
      var avgCrime = total / data.length
      console.log(avgCrime)

      var data2 = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          type: 'indicator',
          mode: 'gauge+number+delta',
          value: totalCrime,
          title: {
            text: 'Crime Review',
          },
          delta: { "reference": avgCrime, "valueformat": ".0f",'increasing': {'color': "Red"}, 'decreasing': {'color':"Green"}},
          gauge: {
            axis: { range: [null, 1000], tickwidth: 1, tickcolor: 'darkgrey', nticks: 6 },
            bar: { color: 'darkgrey', thickness: 0.3 },
            bgcolor: 'white',
            borderwidth: 01,
            bordercolor: 'black',
            axes: [{
              pointers: [{
                type: 'Marker',
                markerType: 'Circle'
              }]
            }],
            steps: [
              { range: [0, 100], color: 'rgba(255, 99, 132, 0.7)' },
              { range: [100, 200], color: 'rgba(255, 159, 64, 0.7)' },
              { range: [200, 300], color: 'rgba(255, 206, 86, 0.7)' },
              { range: [300, 400], color: 'rgba(54, 162, 235, 0.7)' },
              { range: [400, 500], color: 'rgba(75, 192, 192, 0.7)' },
              { range: [500, 600], color: 'rgba(255, 99, 132, 0.7)' },
              { range: [600, 700], color: 'rgba(255, 159, 64, 0.7)' },
              { range: [700, 800], color: 'rgba(255, 206, 86, 0.7)' },
              { range: [800, 900], color: 'rgba(54, 162, 235, 0.7)' },
              { range: [900, 1000], color: 'rgba(75, 192, 192, 0.7)' },
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: avgCrime
            }
          },
        },
      ];

      // Layout 
      var layout = {

        width: 316,
        height: 180,
        margin: { t: 45, r: 20, l: 20, b: 5 },
        font: { color: 'black', family: 'Arial' }
      };


      // end gauge information

      // rendering gauge2 on html
      Plotly.newPlot('gauge2', data2, layout)


    });
};

getGauge();



d3.json(local_flask2).then(function(response) {
  //Generate print icon
var printIcon = function(cell, formatterParams){ //plain text value
  return "<i class='fa fa-print'></i>";
};
  var table = new Tabulator("#example-table", {
    height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data:response, //assign data to table
    layout:"fitData", //fit columns to width of table (optional)
    
    columns:[ //Define Table Columns


      {title:"Market Days", field:"days_on_market", sorter:"number", },
      {title:"Price", field:"price", formatter: "money",  widthGrow:2},
      {title:"Address", field:"address", widthGrow:2},
      {title:"City", field:"city", widthGrow:2},
      {title:"Square Feet", field:"square_feet", widthGrow:2},
      {title:"Baths", field:"baths", widthGrow:2},
      {title:"Beds", field:"beds", widthGrow:2},
      {title:"Lot size", field:"lot_size", widthGrow:2},
      {title:"$ Per Sq. Ft.", field:"price_per_square_feet", widthGrow:2},

      {title:"School Rating", field:"average_school_rating", formatter:"star", hozAlign:"center", widthGrow:2},


      {title:"Year Built", field:"year_built", formatter:"date", widthGrow:2},
      {title:"Crime Per Capita 1000s", field:"crime_per_capita_1000s", formatter:'progress', formatterParams:{color:["#00dd00", "orange", "rgb(255,0,0)"]}, sorter:"number", width:90},

      {title:"Latitude", field:"latitude", widthGrow:2},
      {title:"Longitude", field:"longitude", widthGrow:2},

      {title:"MLS", field:"mls", widthGrow:2},


      {title:"Redfin Url", field:"redfin_url", formatter: "link", widthGrow:2},

      {title:"State", field:"state_or_province",widthGrow:2},

      {title:"Zip Code", field:"zip_code", widthGrow:2}
    ],
    rowClick:function(e, row){ //trigger an alert message when the row is clicked
      alert("Row " + row.getData().id + " Clicked!!!!");
    },
});
});

