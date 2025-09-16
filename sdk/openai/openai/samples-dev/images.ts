// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to generate images from prompts using Azure OpenAI Batch Image Generation.
 *
 * @summary generates images from prompts using Azure OpenAI Batch Image Generation.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

// The prompt to generate images from
const prompt = "a monkey eating a banana";
const size = "1024x1024";

// The number of images to generate
const n = 1;

export async function main(): Promise<void> {
  console.log("== Batch Image Generation ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "dall-e-3";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });
  const results = await client.images.generate({ prompt, model: deployment, n, size });

  for (const image of results.data ?? []) {
    console.log(`Image generation result URL: ${image.url}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
