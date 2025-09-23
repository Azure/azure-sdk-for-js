// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to convert text into speech.
 *
 * @summary text to speech.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { writeFile } from "node:fs/promises";
import "dotenv/config";

// You will need to set these environment variables or edit the following values
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const speechFilePath = process.env["SPEECH_FILE_PATH"] || "<path to save the speech file>";

// Corresponds to your Model deployment within your OpenAI resource
// Navigate to the Azure OpenAI Studio to deploy a model.
const deployment = "tts";
const credential = new DefaultAzureCredential();
const scope = "https://cognitiveservices.azure.com/.default";
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

export async function main(): Promise<void> {
  console.log("== Text to Speech Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }

  const openai = new OpenAI({ apiKey: azureADTokenProvider, baseURL: endpoint + "/openai/v1" });
  const response = await openai.audio.speech.create({
    model: deployment,
    voice: "alloy",
    input: "the quick brown chicken jumped over the lazy dogs",
  });

  const stream = response.body;
  if (!stream) {
    throw new Error("No audio stream returned from the API.");
  }
  console.log(`Streaming response to ${speechFilePath}`);
  await writeFile(speechFilePath, stream);
  console.log("Finished streaming");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
