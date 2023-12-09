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

const feature: string[] = [
  'Objects'
];

const imageUrl: string = 'https://aka.ms/azai/vision/image-analysis-sample.jpg';

client.path('/imageanalysis:analyze').post({
  body: { url: imageUrl },
  queryParameters: { features: feature },
  contentType: 'application/json'
}).then(result => {
  const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

  // Process the response
  if (iaResult.objectsResult && iaResult.objectsResult.values.length > 0) {
    iaResult.objectsResult.values.forEach(object => {
      console.log(`Detected object: ${object.tags[0].name} with confidence of ${object.tags[0].confidence}`);
    });
  } else {
    console.log('No objects detected.');
  }
});
