d3.select("#submit-input").on("click", getData);

var cities = ['Aliso Viejo','Anaheim','Brea','Buena Park','Costa Mesa',
              'Cypress','Dana Point','Fountain Valley','Fullerton','Garden Grove',
              'Huntington Beach','Irvine','La Habra','La Palma','Laguna Beach',
              'Laguna Hills','Laguna Niguel','Lake Forest','Los Alamitos',
              'Mission Viejo','Newport Beach','Orange','Placentia',
              'Rancho Santa Margarita','San Clemente','San Juan Capistrano',
              'Santa Ana','Seal Beach','Stanton','Tustin','Villa Park',
              'Westminster','Yorba Linda'];
var zips = ['90620','90621','90623','90630','90631','90680','90720','90740',
            '92602','92603','92604','92606','92610','92612','92614','92618','92620',
            '92624','92626','92627','92629','92630','92646','92647','92648','92649',
            '92651','92653','92656','92660','92661','92663','92672','92673','92675',
            '92677','92679','92683','92688','92691','92692','92701','92703','92704',
            '92705','92706','92707','92708','92780','92782','92801','92802','92804',
            '92805','92806','92807','92821','92823','92831','92832','92833','92835',
            '92840','92841','92843','92844','92845','92861','92865','92866','92867',
            '92868','92869','92870','92886','92887'];
var schoolRatings = ['2.333','2.667','3.0','3.333','3.667','4.0','4.333','4.4',
                      '4.429','4.6','4.667','4.75','4.833','5.0','5.25','5.333','5.5','5.667',
                      '5.75','6.0','6.25','6.333','6.5','6.667','6.75','7.0','7.25','7.333',
                      '7.667','7.75','8.0','8.2','8.25','8.333','8.5','8.667','8.75','9.0','9.333'];

function getData() {
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

  var values = [4,2.5,1400,2000,2000,10,33.7175,-117.8311,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var numInputs = [beds, baths, sqft, lotSize, yearBuilt, daysOnMarket, lat, lng];

  for (var i=0; i<numInputs.length; i++) {
    if (numInputs[i] != "") {
      values[i] = numInputs[i];
    }
  }
  
  // values[8] = crime; <-- grab from database via city
  values[cities.indexOf(city)+9] = 1;
  values[zips.indexOf(zip)+42] = 1;
  values[schoolRatings.indexOf(schoolRating)+118] = 1;

  console.log(values);

  var valString = "";
  for (var i=0; i<values.length; i++) {
    if (i != (values.length-1)) {
      valString = valString + values[i] + "+";
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


// rendering gauge1 on html
Plotly.newPlot('gauge1', data1, layout)
// rendering gauge2 on html
Plotly.newPlot('gauge2', data2, layout)
