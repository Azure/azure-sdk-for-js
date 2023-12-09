// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { ImageAnalysisClient } = require('@azure/imageanalysis');
const createClient = require('@azure/imageanalysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client = createClient (endpoint, credential);

const feature = [
  'Tags'
];

const imageUrl = 'https://aka.ms/azai/vision/image-analysis-sample.jpg';

client.path('/imageanalysis:analyze').post({
  body: { url: imageUrl },
  queryParameters: { features: feature},
  contentType: 'application/json'
}).then(result => {
  const iaResult = result.body;

  // Process the response
  if (iaResult.tagsResult.values.length > 0) {
    iaResult.tagsResult.values.forEach(tag => {
      console.log(`Tag: ${tag.name} with confidence of ${tag.confidence}`);
    });
  } else {
    console.log('No tags detected.');
  }
});
