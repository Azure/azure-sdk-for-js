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
  'Caption',
  'DenseCaptions',
  'Objects',
  'People',
  'Read',
  'SmartCrops',
  'Tags'
];
const imageUrl: string = 'https://aka.ms/azai/vision/image-analysis-sample.jpg';

async function analyzeImageFromUrl(): Promise<void> {
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

  const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

  console.log(`Model Version: ${iaResult.modelVersion}`);
  console.log(`Image Metadata: ${JSON.stringify(iaResult.metadata)}`);
  if (iaResult.captionResult) console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
  if (iaResult.denseCaptionsResult) iaResult.denseCaptionsResult.values.forEach(denseCaption => console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`));
  if (iaResult.objectsResult) iaResult.objectsResult.values.forEach(object => console.log(`Object: ${JSON.stringify(object)}`));
  if (iaResult.peopleResult) iaResult.peopleResult.values.forEach(person => console.log(`Person: ${JSON.stringify(person)}`));
  if (iaResult.readResult) iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
  if (iaResult.smartCropsResult) iaResult.smartCropsResult.values.forEach(smartCrop => console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`));
  if (iaResult.tagsResult) iaResult.tagsResult.values.forEach(tag => console.log(`Tag: ${JSON.stringify(tag)}`));
}

analyzeImageFromUrl();
