// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt and parse output for content filter
 *
 * @summary get completions.
 * @azsdk-weight 100
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

export async function main() {
  console.log("== Streaming Chat Completions Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-35-turbo";
  const apiVersion = "2024-04-01-preview";
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
      const filterResults = (choice as any).content_filter_results;
      if (!filterResults) {
        continue;
      }
      if (filterResults.error) {
        console.log(
          `\tContent filter ran into an error ${filterResults.error.code}: ${filterResults.error.message}`
        );
      } else {
        const { hate, sexual, selfHarm, violence } = filterResults;
        console.log(`\tHate category is filtered: ${hate?.filtered}, with ${hate?.severity} severity`);
        console.log(
          `\tSexual category is filtered: ${sexual?.filtered}, with ${sexual?.severity} severity`
        );
        console.log(
          `\tSelf-harm category is filtered: ${selfHarm?.filtered}, with ${selfHarm?.severity} severity`
        );
        console.log(
          `\tViolence category is filtered: ${violence?.filtered}, with ${violence?.severity} severity`
        );
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
