// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to generate images from prompts using Azure OpenAI Batch Image Generation.
 *
 * @summary generates images from prompts using Azure OpenAI Batch Image Generation.
 * @azsdk-weight 100
 */

import { OpenAIClient, AzureKeyCredential, ImageLocation } from "@azure/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

// The prompt to generate images from
const PROMPT = "a monkey eating a banana";
const SIZE = "256x256";

// The number of images to generate
const N = 3;

export async function main() {
  console.log("== Batch Image Generation ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  let operationState = await client.beginAzureBatchImageGeneration(PROMPT, { n: N, size: SIZE });

  while (operationState.status === "notRunning" || operationState.status === "running") {
    await delay(5000);
    operationState = await client.getAzureBatchImageGenerationOperationStatus(operationState.id);
  }

  if (operationState.status !== "succeeded") {
    throw new Error("Image generation failed");
  }

  console.log(`Image generation succeeded with id: ${operationState.id}`);
  for (const image of operationState.result?.data as ImageLocation[]) {
    console.log(`Image generation result URL: ${image.url}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
