// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt.
 *
 * @summary get completions.
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

// Your Azure OpenAI endpoint
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint>";

const prompt = ["What is Azure OpenAI?"];

export async function main() {
  console.log("== Get completions Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "text-davinci-003";
  const apiVersion = "2024-07-01-preview";
  const client = new AzureOpenAI({ endpoint, azureADTokenProvider, deployment, apiVersion });
  const result = await client.completions.create({ prompt, model: "", max_tokens: 128 });

  for (const choice of result.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
