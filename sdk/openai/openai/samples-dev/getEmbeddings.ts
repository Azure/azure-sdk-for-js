// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get embedding vectors for a piece of text using Azure OpenAI.
 *
 * @summary generates embedding vectors from a prompt using Azure OpenAI Get Embeddings.
 * @azsdk-weight 100
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

// The prompt to generate the embeddings vector
const prompt = ["This is the sample text to be embedded"];

// The name of the model
const modelName = "text-embedding-ada-002";

export async function main() {
  console.log("== Get embeddings sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const embeddings = await client.getEmbeddings(modelName, prompt);

  for (const embeddingData of embeddings.data) {
    console.log(`The embedding values are ${embeddingData.embedding}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
