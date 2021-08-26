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


// rendering gauge1 on html
Plotly.newPlot('gauge1', data1, layout)
// rendering gauge2 on html
Plotly.newPlot('gauge2', data2, layout)
