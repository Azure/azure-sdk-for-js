// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list chat completions for a chat context.
 *
 * @summary list chat completions.
 */

import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { createSseStream } from "@azure/core-sse";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

export async function main() {
  console.log("== Streaming Chat Completions Sample ==");

  const client = new ModelClient(endpoint, new AzureKeyCredential(azureApiKey));
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant. You will talk like a pirate." }, // System role not supported for some models
        { role: "user", content: "Can you help me?" },
        { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
        { role: "user", content: "What's the best way to train a parrot?" },
      ],
      stream: true,
      max_tokens: 128,
    }
  }).asNodeStream();

  const stream = response.body;
  if (!stream) {
    throw new Error("The response stream is undefined");
  }

  if (response.status !== "200") {
    throw new Error(`Failed to get chat completions: ${streamToString(stream)}`);
  }

  const sses = createSseStream(stream);

  for await (const event of sses) {
    if (event.data === "[DONE]") {
      return;
    }
    for (const choice of (JSON.parse(event.data)).choices) {
      console.log(choice.delta?.content ?? "");
    }
  }

  async function streamToString(stream: NodeJS.ReadableStream) {
    // lets have a ReadableStream as a stream variable
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
