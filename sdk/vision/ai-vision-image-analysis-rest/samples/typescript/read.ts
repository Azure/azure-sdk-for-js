// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createImageAnalysisClient, { ImageAnalysisClient, isUnexpected } from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const endpoint: string = process.env['VISION_ENDPOINT'] || '<your_endpoint>';
const key: string = process.env['VISION_KEY'] || '<your_key>';
const credential = new AzureKeyCredential(key);

const client: ImageAnalysisClient = createImageAnalysisClient(endpoint, credential);

const features: string[] = [
  'Read'
];

const imageUrl: string = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

async function analyzeImage(): Promise<void> {

  const result = await client.path('/imageanalysis:analyze').post({
    body: { url: imageUrl },
    queryParameters: { features: features },
    contentType: 'application/json'
  })

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  // Process the response
  if (result.body.readResult && result.body.readResult.blocks.length > 0) {
    result.body.readResult.blocks.forEach(block => {
      console.log(`Detected text block: ${JSON.stringify(block)}`);
    });
  } else {
    console.log('No text blocks detected.');
  }
}

analyzeImage();