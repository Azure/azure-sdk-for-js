// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createImageAnalysisClient, {
  DenseCaptionOutput,
  ImageAnalysisClient,
  DetectedPersonOutput,
  DetectedTextBlockOutput,
  DetectedObjectOutput,
  CropRegionOutput,
  DetectedTagOutput,
  isUnexpected
} from '@azure-rest/ai-vision-image-analysis';
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
const imageUrl: string = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

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

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  console.log(`Model Version: ${result.body.modelVersion}`);
  console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`);
  if (result.body.captionResult) console.log(`Caption: ${result.body.captionResult.text} (confidence: ${result.body.captionResult.confidence})`);
  if (result.body.denseCaptionsResult) result.body.denseCaptionsResult.values.forEach((denseCaption: DenseCaptionOutput) => console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`));
  if (result.body.objectsResult) result.body.objectsResult.values.forEach((object: DetectedObjectOutput) => console.log(`Object: ${JSON.stringify(object)}`));
  if (result.body.peopleResult) result.body.peopleResult.values.forEach((person: DetectedPersonOutput) => console.log(`Person: ${JSON.stringify(person)}`));
  if (result.body.readResult) result.body.readResult.blocks.forEach((block: DetectedTextBlockOutput) => console.log(`Text Block: ${JSON.stringify(block)}`));
  if (result.body.smartCropsResult) result.body.smartCropsResult.values.forEach((smartCrop: CropRegionOutput) => console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`));
  if (result.body.tagsResult) result.body.tagsResult.values.forEach((tag: DetectedTagOutput) => console.log(`Tag: ${JSON.stringify(tag)}`));
}

analyzeImageFromUrl();
