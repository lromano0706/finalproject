// API key
const API_KEY = "pk.eyJ1IjoibHJvbWFubzA3MDYiLCJhIjoiY2tyNGJncDQ0MnU2azJ2cWh1cGl4dG9rdCJ9.v9IbcbVWKDuOrVYAKXfsxQ";

// setup for chart
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
// end setup