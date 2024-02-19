// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  'SmartCrops'
];

const imageUrl: string = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

async function analyzeImage(): Promise<void> {

  const result = await client.path('/imageanalysis:analyze').post({
    body: { url: imageUrl },
    queryParameters: { features: features, 'smartCrops-aspect-ratios': [0.9, 1.33] },
    contentType: 'application/json',
  })

  if (isUnexpected(result)) {
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