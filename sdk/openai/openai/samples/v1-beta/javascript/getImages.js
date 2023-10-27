// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to generate images from prompts using Azure OpenAI Batch Image Generation.
 *
 * @summary generates images from prompts using Azure OpenAI Batch Image Generation.
 */

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

// The prompt to generate images from
const prompt = "a monkey eating a banana";
const size = "256x256";

// The number of images to generate
const n = 3;

async function main() {
  console.log("== Batch Image Generation ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const results = await client.getImages(prompt, { n, size });

  for (const image of results.data) {
    console.log(`Image generation result URL: ${image.url}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
