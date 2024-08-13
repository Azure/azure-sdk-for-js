// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list chat completions for a chat context.
 *
 * @summary list chat completions.
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
  const apiVersion = "2024-05-01-preview";
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
      console.log(choice.delta?.content);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
