// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions using an audio URL.
 * NOTE: Audio URL completions currently work only with Phi multimodal models.
 * For more information, see https://learn.microsoft.com/en-us/azure/ai-foundry/model-inference/concepts/models
 *
 * @summary Get chat completions using Audio URL.
 */

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
import { createRestError } from "@azure-rest/core-client";

// Load the .env file if it exists
import "dotenv/config";
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];

export async function main(): Promise<void> {
  console.log("== Chat Completions Audio URL Sample ==");

  const client = createModelClient();

  const systemMessage = { role: "system", content: "You are a helpful assistant." };
  const audioMessage = { 
    role: "user",
    content: [
      { type: "text", text: "Transcribe this audio."},
      { type: "audio_url",
        audio_url: {
          url: "https://example.com/audio.mp3", 
        },
      },
    ] 
  };

  const messages = [
    systemMessage,
    audioMessage
  ];

  const response = await client.path("/chat/completions").post({
    body: {
      messages,
      model: modelName,
    },
  });

  if (isUnexpected(response)) {
    throw createRestError(response);
  }

  for (const choice of response.body.choices) {
    console.log(choice.message.content);
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
