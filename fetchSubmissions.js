"use strict";
import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

const oauth_token = process.env.NETLIFY_AUTH_TOKEN;



// get form submissions from netlify and write to json file
fetch(
  `https://api.netlify.com/api/v1/forms/6165bd0a43e1cc0008cbe84b/submissions?access_token=${oauth_token}`
)
  .then((response) => response.text())
  .then((result) => {
    let results = JSON.parse(result);
    let submission = {}
    let submissions = []
    results.forEach((res) => {

      submission = {
        'id': res.id,
        'archive-name': res.data['archive-name'],
        'archive-description': res.data['archive-description'],
        'archive-time': res.data['archive-time'],
        'archive-country': res.data['archive-country'],
        coordinates: {
          lng: res.data.lng,
          lat: res.data.lat
        },
        'archive-link': res.data['archive-link'],
        'archive-tags': res.data['archive-tags'],
        'archive-type-materials': {
          audio: res.data.audio,
          film: res.data.film,
          ephemer: res.data.ephemer,
          images: res.data.images,
          'official-records': res.data['official-records'],
          'fine-art': res.data['fine-art'],
          correspondence: res.data.correspondence,
          'published-reports': res.data['published-reports'],
          maps: res.data.maps,
          unknown: res.data.unknown,
        },
      }
      submissions.push(submission)
    });

    console.log('submission',submissions);
   
    const jsonString = JSON.stringify(submissions);

    fs.writeFile("data.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  })
  .catch((error) => console.log("error", error));
