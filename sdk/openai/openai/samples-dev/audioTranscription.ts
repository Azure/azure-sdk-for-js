// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe the content of an audio file.
 *
 * @summary audio transcription.
 * @azsdk-weight 100
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { stat } from "fs/promises";
import { createReadStream } from "fs";

// Load the .env file if it exists
import dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

export async function main() {
  console.log("== Transcribe Audio Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "whisper";
  const name = "countdown.wav";
  const filePath = `./assets/audio/${name}`;
  const result = await client.getAudioTranscription(deploymentName, {
    stream: async () => createReadStream(filePath),
    length: (await stat(filePath)).size,
    name,
  });

  console.log(`Transcription: ${result.text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
