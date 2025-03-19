// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list chat completions for a chat context.
 *
 * @summary List chat completions.
 */

const ModelClient = require("@azure-rest/ai-inference").default;
const { DefaultAzureCredential } = require("@azure/identity");
const { createSseStream } = require("@azure/core-sse");
const { createRestError } = require("@azure-rest/core-client");

// Load the .env file if it exists
require("dotenv/config");
const { AzureKeyCredential } = require("@azure/core-auth");
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];

async function main() {
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

  const sses = createSseStream(stream);

  for await (const event of sses) {
    if (event.data === "[DONE]") {
      return;
    }
    for (const choice of JSON.parse(event.data).choices) {
      console.log(choice.delta?.content ?? "");
    }
  }

  async function streamToString(streamToConvert) {
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
function createModelClient() {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // auth scope for MaaS and MaaP is currently https://ml.azure.com
  // (Do not use for Serverless API or Managed Computer Endpoints)
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes = [];
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

module.exports = { main };
