// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list chat completions for a chat context.
 *
 * @summary list chat completions.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

export async function main(): Promise<void> {
  console.log("== Streaming Chat Completions Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4o";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });
  const events = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
      { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
      { role: "user", content: "What's the best way to train a parrot?" },
    ],
    model: deployment,
    max_tokens: 128,
    stream: true,
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
