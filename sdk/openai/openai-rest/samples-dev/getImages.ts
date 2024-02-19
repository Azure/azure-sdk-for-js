// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to generate images from prompts using Azure OpenAI Batch Image Generation.
 *
 * @summary generates images from prompts using Azure OpenAI Batch Image Generation.
 * @azsdk-weight 100
 */

import createClient, { AzureKeyCredential, isUnexpected } from "@azure-rest/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

// The prompt to generate images from
const prompt = "a monkey eating a banana";
const size = "1024x1024";

// The number of images to generate
const n = 1;

export async function main() {
  console.log("== Batch Image Generation ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "dall-e-3";
  const response = await client
    .path("/deployments/{deploymentId}/images/generations", deploymentName)
    .post({
      body: {
        prompt,
        n,
        size,
      },
    });

  if (isUnexpected(response)) {
    throw new Error(`Failed to generate images: ${JSON.stringify(response.body)}`);
  }

  for (const image of response.body.data) {
    console.log(`Image generation result URL: ${image.url}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
