// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createImageAnalysisClient, { ImageAnalysisClient, ImageAnalysisResultOutput } from '@azure/imageAnalysis';
import { AzureKeyCredential } from '@azure/core-auth';

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const endpoint: string = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key: string = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client: ImageAnalysisClient = createImageAnalysisClient(endpoint, credential);

const features: string[] = [
  'Tags'
];

const imageUrl: string = 'https://aka.ms/azai/vision/image-analysis-sample.jpg';

client.path('/imageanalysis:analyze').post({
  body: { url: imageUrl },
  queryParameters: { features: features },
  contentType: 'application/json'
}).then(result => {
  const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

  // Process the response
  if (iaResult.tagsResult && iaResult.tagsResult.values.length > 0) {
    iaResult.tagsResult.values.forEach(tag => {
      console.log(`Tag: ${tag.name} with confidence of ${tag.confidence}`);
    });
  } else {
    console.log('No tags detected.');
  }
});
