// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Azure's Bring Your Own Data with Azure OpenAI Chat Completions.
 *
 * @summary chat completions with your own data.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "@azure/openai/types";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureSearchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"];
const azureSearchIndexName = process.env["AZURE_SEARCH_INDEX"];

export async function main(): Promise<void> {
  console.log("== On Your Data Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  if (!azureSearchEndpoint) {
    throw new Error("Please set the AZURE_SEARCH_ENDPOINT environment variable.");
  }
  if (!azureSearchIndexName) {
    throw new Error("Please set the AZURE_SEARCH_INDEX environment variable.");
  }

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });
  const events = await client.chat.completions.create({
    stream: true,
    messages: [
      {
        role: "user",
        content:
          "What's the most common feedback we received from our customers about the product?",
      },
    ],
    max_tokens: 128,
    model: deployment,
    data_sources: [
      {
        type: "azure_search",
        parameters: {
          endpoint: azureSearchEndpoint,
          index_name: azureSearchIndexName,
          authentication: {
            type: "system_assigned_managed_identity",
          },
        },
      },
    ],
  });

  for await (const event of events) {
    for (const choice of event.choices) {
      if (choice.delta?.content) {
        process.stdout.write(choice.delta.content);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
