const mapboxgl = require("mapbox-gl");

fetch("data.json")
  .then((response) => response.text())
  .then((result) => {
    console.log('result',result);
    let results = JSON.parse(result);
    mapboxgl.accessToken =
      "pk.eyJ1IjoibXVsdGl0dWRlcyIsImEiOiJja3VtbXRyM3cwZzQ3MnZwMTdoenRheXUxIn0.mTaqrjMcME57vZlFxGIRJQ";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/multitudes/ckuplhk1b4gg217o7zpc74lhi",
      center: [0,56],
      zoom: 4
    });

    results.coordinates.forEach((coordinate)=>{
      new mapboxgl.Marker().setLngLat(coordinate).addTo(map);
    });

  })
  .catch((error) => console.log("error", error));


