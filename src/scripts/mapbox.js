import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXVsdGl0dWRlcyIsImEiOiJja3VtbXRyM3cwZzQ3MnZwMTdoenRheXUxIn0.mTaqrjMcME57vZlFxGIRJQ";
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: "country,region,place,postcode,locality,neighborhood",
});

export const geocoderField = () => {
  geocoder.addTo("#geocoder");

  // Get the geocoder results container.
  const results = document.getElementById("result");
  const latField = document.getElementById("lat");
  const lngField = document.getElementById("lng");

  // Add geocoder result to container.
  geocoder.on("result", (e) => {
    latField.value = JSON.stringify(e.result.geometry.coordinates[0], null, 2);
    lngField.value = JSON.stringify(e.result.geometry.coordinates[1], null, 2);
  });

  // Clear results container when search is cleared.
  geocoder.on("clear", () => {
    latField.value = "";
    lngField.value = "";
  });
};
