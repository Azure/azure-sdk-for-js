// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list chat completions for a chat context.
 *
 * @summary List chat completions.
 */

import ModelClient from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";
import { createSseStream } from "@azure/core-sse";
import { createRestError } from "@azure-rest/core-client";

// Load the .env file if it exists
import "dotenv/config";
import type { IncomingMessage } from "node:http";
import { AzureKeyCredential } from "@azure/core-auth";
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];

export async function main(): Promise<void> {
  console.log("== Streaming Chat Completions Sample ==");

  const client = createModelClient();
  const response = await client
    .path("/chat/completions")
    .post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant. You will talk like a pirate." }, // System role not supported for some models
          { role: "user", content: "Can you help me?" },
          { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
          { role: "user", content: "What's the best way to train a parrot?" },
        ],
        stream: true,
        max_tokens: 128,
        model: modelName,
      },
    })
    .asNodeStream();

  const stream = response.body;
  if (!stream) {
    throw new Error("The response stream is undefined");
  }

  if (response.status !== "200") {
    throw createRestError(response);
  }

  const sses = createSseStream(stream as IncomingMessage);

  for await (const event of sses) {
    if (event.data === "[DONE]") {
      return;
    }
    for (const choice of JSON.parse(event.data).choices) {
      console.log(choice.delta?.content ?? "");
    }
  }

  async function streamToString(streamToConvert: NodeJS.ReadableStream): Promise<string> {
    // lets have a ReadableStream as a stream variable
    const chunks = [];

    for await (const chunk of streamToConvert) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
  }
}

/*
 * This function creates a model client.
 */
function createModelClient(): ModelClient {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // auth scope for MaaS and MaaP is currently https://ml.azure.com
  // (Do not use for Serverless API or Managed Computer Endpoints)
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes: string[] = [];
    if (endpoint.includes(".models.ai.azure.com")) {
      scopes.push("https://ml.azure.com");
    } else if (endpoint.includes(".openai.azure.com/openai/deployments/")) {
      scopes.push("https://cognitiveservices.azure.com");
    }

    const clientOptions = { credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
