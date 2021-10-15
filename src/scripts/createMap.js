const mapboxgl = require("mapbox-gl");

fetch("data.json")
  .then((response) => response.text())
  .then((result) => {
    let results = JSON.parse(result);

    function createCoordinates(result) {
        let pairedCoordinates = [];
        pairedCoordinates.push(parseFloat(result.coordinates.lng));
        pairedCoordinates.push(parseFloat(result.coordinates.lat));
      return pairedCoordinates;
    }

    mapboxgl.accessToken =
      "pk.eyJ1IjoibXVsdGl0dWRlcyIsImEiOiJja3VtbXRyM3cwZzQ3MnZwMTdoenRheXUxIn0.mTaqrjMcME57vZlFxGIRJQ";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/multitudes/ckuplhk1b4gg217o7zpc74lhi",
      center: [0, 56],
      zoom: 4,
    });
    
    results.forEach((result) => {
      new mapboxgl.Marker().setLngLat(createCoordinates(result)).addTo(map);
    });
  })

  .catch((error) => console.log("error", error));
