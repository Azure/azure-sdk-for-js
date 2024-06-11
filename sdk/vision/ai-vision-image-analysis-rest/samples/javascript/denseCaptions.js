// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client = createClient (endpoint, credential);

const feature = [
  'DenseCaptions'
];

const imageUrl = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

async function analyzeImage() {

  const result = await client.path('/imageanalysis:analyze').post({
    body: { url: imageUrl },
    queryParameters: { features: feature},
    contentType: 'application/json'
  });

  const iaResult = result.body;

  // Process the response
  if (iaResult.denseCaptionsResult.values.length > 0) {
    iaResult.denseCaptionsResult.values.forEach(caption => {
      console.log(`Caption: ${caption.text} with confidence of ${caption.confidence}`);
    });
  } else {
    console.log('No dense captions detected.');
  }
}

analyzeImage();