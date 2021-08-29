// Use local flask API to get Medal and country data
var local_flask = "http://127.0.0.1:5000/houses";


// Call/Response json data from local API
d3.json(local_flask).then(function(response) {
  
    console.log(response[0]);

    // arrays to hold home prices
    var prices = [];
    var labels = [];

    for (var i = 0; i < response.length; i++) {
            prices.push(response[i].price);
            labels.push(response[i].city)
        }

    var trace11 = {
        x: prices,
        type: "histogram",
        opacity: 0.5,
        marker: {
        color: 'green',
        },
    };

    console.log(trace11);
    // Data12 to keep variables unique
    var data12 = [trace11];
    var layout12 = {
        title: 'Distribution of Home Prices',
        barmode: "overlay",
        xaxis: {
            title: 'Home Price ($)'
        },
        yaxis: {
            title: 'Number of Homes'
        }
    };
    var config = {responsive: true}
    Plotly.newPlot('myChart2', data12, layout12, config);

    
})

// creation of line chart that is getting pulled to index page

var x1 = [];
var x2 = [];

// var trace12 = {
//   x: x2,
//   type: "histogram",
//   opacity: 0.6,
//   marker: {
//      color: 'red',
//   },
// };

