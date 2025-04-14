// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client = createClient(endpoint, credential);

const features = [
  'Caption',
  'DenseCaptions',
  'Objects',
  'People',
  'Read',
  'SmartCrops',
  'Tags'
];
const imageUrl = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

async function analyzeImageFromUrl() {

  const result = await client.path('/imageanalysis:analyze').post({
    body: {
        url: imageUrl
    },
    queryParameters: {
        features: features,
        'smartCrops-aspect-ratios': [0.9, 1.33]
    },
    contentType: 'application/json'
  });

  const iaResult = result.body;

  console.log(`Model Version: ${iaResult.modelVersion}`);
  console.log(`Image Metadata: ${JSON.stringify(iaResult.metadata)}`);
  if (iaResult.captionResult) {
    console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
  }
  if (iaResult.denseCaptionsResult) {
    iaResult.denseCaptionsResult.values.forEach(denseCaption => console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`));
  }
  if (iaResult.objectsResult) {
    iaResult.objectsResult.values.forEach(object => console.log(`Object: ${JSON.stringify(object)}`));
  }
  if (iaResult.peopleResult) {
    iaResult.peopleResult.values.forEach(person => console.log(`Person: ${JSON.stringify(person)}`));
  }
  if (iaResult.readResult) {
    iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
  }
  if (iaResult.smartCropsResult) {
    iaResult.smartCropsResult.values.forEach(smartCrop => console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`));
  }
  if (iaResult.tagsResult) {
    iaResult.tagsResult.values.forEach(tag => console.log(`Tag: ${JSON.stringify(tag)}`));
  }
}

analyzeImageFromUrl();