// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createImageAnalysisClient, { ImageAnalysisClient, ImageAnalysisResultOutput } from '@azure/imageAnalysis';
import { AzureKeyCredential } from '@azure/core-auth';

const endpoint: string = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key: string = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client: ImageAnalysisClient = createImageAnalysisClient(endpoint, credential);

const features: string[] = [
  'Read'
];

const imageUrl: string = 'https://aka.ms/azai/vision/image-analysis-sample.jpg';

client.path('/imageanalysis:analyze').post({
  body: { url: imageUrl },
  queryParameters: { features: features},
  contentType: 'application/json'
}).then(result => {
  const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

  // Process the response
  if (iaResult.readResult.blocks.length > 0) {
    iaResult.readResult.blocks.forEach(block => {
      console.log(`Detected text block: ${JSON.stringify(block)}`);
    });
  } else {
    console.log('No text blocks detected.');
  }
});