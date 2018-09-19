var geojson;

var myMap = L.map("map", {
  center: [0,0],
  zoom: 2
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);


var countries = [{
  location: [-33.87, 151.2],
  name: "Australia",
  observation: "54"
  },
  {
  location: [49.28, -123.12],
  name: "Canada",
  observation: "87"
  },
  {
  location: [-36.85, 174.76],
  name: "New Zealand",
  observation: "5"
  },
  {
  location: [53.35, -6.26],
  name: "Ireland",
  observation: "20"
  },
  {
  location: [51.51, -0.13],
  name: "UK",
  observation: "1044"
  },
  {
  location: [34.05, -118.24],
  name: "USA",
  observation: "557"
  } 
  ];

for (var i = 0; i < countries.length; i++) {
  var country = countries[i];
  L.marker(country.location)
    .bindPopup("<h1>" + country.name + "</h1> <hr> <h2>Observation Counts: " + country.observation + "</h2>")
    .addTo(myMap);
};


d3.json("map.json", function(data){
  console.log(data);
  geojson = L.choropleth(data, {
    valueProperty: "observation",
    scale:["#ffffb2", "#b10026"],
    steps: 6,
    mode:'q',
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
  }).addTo(myMap);
});

console.log(myMap);