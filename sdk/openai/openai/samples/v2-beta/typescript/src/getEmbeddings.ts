// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get embedding vectors for a piece of text using Azure OpenAI.
 *
 * @summary generates embedding vectors from a prompt using Azure OpenAI Get Embeddings.
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

// The prompt to generate the embeddings vector
const input = ["This is the sample text to be embedded"];

export async function main() {
  console.log("== Get embeddings sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const apiVersion = "2024-04-01-preview";
  const deployment = "text-embedding-3-large";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
  const embeddings = await client.embeddings.create({ input, model: deployment });

  for (const embeddingData of embeddings.data) {
    console.log(`The embedding values are ${embeddingData.embedding}`);
  }
}

main().catch((err) => {
  parseOpenAIError(err);
});
