"use strict";
import fetch from "node-fetch";
import fs from "fs";
import dotenv from 'dotenv';

const oauth_token = process.env.NETLIFY_AUTH_TOKEN;

function createCoordinates(responsesArray) {
  let coordinates = [];
  for (let i of responsesArray) {
    let pairedCoordinates = [];
    pairedCoordinates.push(parseFloat(i.lng));
    pairedCoordinates.push(parseFloat(i.lat));
    coordinates.push(pairedCoordinates);
  }
  return coordinates;
}

// get form submissions from netlify and write to json file
fetch(
  `https://api.netlify.com/api/v1/forms/6165bd0a43e1cc0008cbe84b/submissions?access_token=${oauth_token}`
)
  .then((response) => response.text())
  .then((result) => {
    let results = JSON.parse(result);
    let responsesArray = [];
    
    for (let res of results) {
      responsesArray.push(res.data);
    }
    let coordinates = {
      coordinates: createCoordinates(responsesArray),
    };
    
    const jsonString = JSON.stringify(coordinates);
    fs.writeFile("data.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  })
  .catch((error) => console.log("error", error));
