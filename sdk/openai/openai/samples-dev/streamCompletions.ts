// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list completions for the provided prompt.
 *
 * @summary list completions.
 * @azsdk-weight 100
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

const prompt = ["What is Azure OpenAI?"];

export async function main() {
  console.log("== Stream Completions Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "text-davinci-003";
  const apiVersion = "2024-04-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
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
