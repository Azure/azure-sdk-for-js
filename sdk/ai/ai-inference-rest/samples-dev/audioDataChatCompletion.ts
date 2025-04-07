// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions using audio data.
 * NOTE: Audio data completions currently work only with GPT audio models.
 * For more information, see https://learn.microsoft.com/en-us/azure/ai-foundry/model-inference/concepts/models
 *
 * @summary Get chat completions using Audio data.
 */

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
import { createRestError } from "@azure-rest/core-client";
import fs from "node:fs/promises";

// Load the .env file if it exists
import "dotenv/config";
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];
const audioFilePath = "hello_how_are_you.mp3";
const format = "mp3";

export async function main(): Promise<void> {
  console.log("== Chat Completions Audio Data Sample ==");

  const client = createModelClient();

  const data = await getAudioData(audioFilePath);

  const systemMessage = { role: "system", content: "You are a helpful assistant." };
  const audioMessage = { 
    role: "user",
    content: [
      { type: "text", text: "Transcribe this audio."},
      { type: "input_audio",
        input_audio: {
          data,
          format,
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
    return ModelClient(endpoint, new AzureKeyCredential(key), {
      apiVersion: "2025-01-01-preview",
    });
  } else {
    const scopes: string[] = [];
    if (endpoint.includes(".models.ai.azure.com")) {
      scopes.push("https://ml.azure.com");
    } else if (endpoint.includes(".openai.azure.com/openai/deployments/")) {
      scopes.push("https://cognitiveservices.azure.com");
    }

    const clientOptions = { apiVersion: "2025-01-01-preview", credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

/**
 * Get the Base 64 data of an audio file.
 * @param {string} audioFile - The path to the image file.
 * @returns {string} Base64 data of the audio.
 */
async function getAudioData(audioFile: string): Promise<string> {
  try {
    const audioBuffer = await fs.readFile(audioFile);
    return audioBuffer.toString("base64");
  } catch (error) {
    console.error(`Could not read '${audioFile}'.`);
    console.error("Set the correct path to the audio file before running this sample.");
    process.exit(1);
  }
}


main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
