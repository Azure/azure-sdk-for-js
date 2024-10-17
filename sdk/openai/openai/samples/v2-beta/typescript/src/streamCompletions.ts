// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list completions for the provided prompt.
 *
 * @summary list completions.
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

// Your Azure OpenAI endpoint
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint>";

const prompt = ["What is Azure OpenAI?"];

export async function main() {
  console.log("== Stream Completions Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "text-davinci-003";
  const apiVersion = "2024-07-01-preview";
  const client = new AzureOpenAI({ endpoint, azureADTokenProvider, deployment, apiVersion });
  const events = await client.completions.create({
    prompt,
    model: "",
    max_tokens: 128,
    stream: true,
  });

  for await (const event of events) {
    for (const choice of event.choices) {
      console.log(choice.text);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
