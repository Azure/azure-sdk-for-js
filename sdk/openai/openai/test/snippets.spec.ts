// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import "@azure/openai/types";

describe("snippets", () => {
  it("ReadmeSampleAnalyzeBusinessData", async () => {
    // Import OpenAI Type Helpers
    // FIX: import "@azure/openai/types";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);
    // @ts-preserve-whitespace
    // Your Azure Cognitive Search endpoint, and index name
    const azureSearchEndpoint = "<search endpoint>";
    const azureSearchIndexName = "<search index>";
    // @ts-preserve-whitespace
    const deployment = "gpt-4-1106-preview";
    const apiVersion = "2025-01-01-preview";
    const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
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
      model: "",
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
    // @ts-preserve-whitespace
    for await (const event of events) {
      for (const choice of event.choices) {
        console.log(choice.delta?.content);
      }
    }
  });

  it("ReadmeSampleContentFilteredChatCompletions", async () => {
    // Import OpenAI Type Helpers
    // FIX: import "@azure/openai/types";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const scope = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(credential, scope);
    // @ts-preserve-whitespace
    // Your Azure Cognitive Search endpoint, and index name
    const azureSearchEndpoint = "<search endpoint>";
    const azureSearchIndexName = "<search index>";
    // @ts-preserve-whitespace
    const deployment = "gpt-4-1106-preview";
    const apiVersion = "2025-01-01-preview";
    const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
    const events = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
        { role: "user", content: "Can you help me?" },
        { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
        { role: "user", content: "What's the best way to train a parrot?" },
      ],
      model: "",
      max_tokens: 128,
      stream: true,
    });

    for await (const event of events) {
      for (const choice of event.choices) {
        console.log(`Chunk: ${choice.delta?.content}`);
        const filterResults = choice.content_filter_results;
        if (!filterResults) {
          continue;
        }
        if (filterResults.error) {
          console.log(
            `\tContent filter ran into an error ${filterResults.error.code}: ${filterResults.error.message}`,
          );
        } else {
          const { hate, sexual, self_harm, violence } = filterResults;
          console.log(
            `\tHate category is filtered: ${hate?.filtered}, with ${hate?.severity} severity`,
          );
          console.log(
            `\tSexual category is filtered: ${sexual?.filtered}, with ${sexual?.severity} severity`,
          );
          console.log(
            `\tSelf-harm category is filtered: ${self_harm?.filtered}, with ${self_harm?.severity} severity`,
          );
          console.log(
            `\tViolence category is filtered: ${violence?.filtered}, with ${violence?.severity} severity`,
          );
        }
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
