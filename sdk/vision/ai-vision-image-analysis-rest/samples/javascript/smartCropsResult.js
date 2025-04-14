// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const createImageAnalysisClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');
// Load the .env file if it exists
require('dotenv').config();

const endpoint = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client = createImageAnalysisClient(endpoint, credential);

const features = [
  'SmartCrops'
];

const imageUrl = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

async function analyzeImage() {

  const result = await client.path('/imageanalysis:analyze').post({
    body: { url: imageUrl },
    queryParameters: { features: features },
    contentType: 'application/json',
    'smartCrops-aspect-ratios': [0.9, 1.33]
  })

  if (result.status !== '200') {
    throw result.body.error;
  }

  // Process the response
  if (result.body.smartCropsResult && result.body.smartCropsResult.values.length > 0) {
    console.log(`Detected ${result.body.smartCropsResult.values.length} smart crops.`);
    result.body.smartCropsResult.values.forEach(smartCrop => console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`));
  } else {
    console.log('No smart crops detected.');
  }
}

analyzeImage();