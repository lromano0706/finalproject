//API key
const API_KEY = "pk.eyJ1IjoibHJvbWFubzA3MDYiLCJhIjoiY2tyNGJncDQ0MnU2azJ2cWh1cGl4dG9rdCJ9.v9IbcbVWKDuOrVYAKXfsxQ";
// setup for line chart
const labels = ["January","February","March","April","May", "June", "July", "August", "September"," December"];
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
      data: {"January": 200,"February": 201,"March": 230,"April": 240 ,"May": 250, "June": 260, "July":170, "August":280, "September": 290 ," December": 200},
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
      data: {"January": 100,"February": 101,"March": 130,"April": 140 ,"May": 150, "June": 160, "July":170, "August":180, "September": 190 ," December": 200},
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

var data1 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    type: 'indicator',
    mode: 'gauge',
    value: 2,
    title: {
      text: 'School Review',
    },
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
        value: 4
      }
    },
  },
];

var data2 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    type: 'indicator',
    mode: 'gauge',
    value: avgCrime,
    title: {
      text: 'Crime Review',
    },
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
        value: 1
      }
    },
  },
];




// Layout 
var layout = {

  width: 316,
  height: 180,
  margin: { t: 45, r: 25, l: 25, b: 5 },
  font: { color: 'black', family: 'Arial' }
};


// end gauge information