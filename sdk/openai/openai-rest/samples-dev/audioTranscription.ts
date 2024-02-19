// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe the content of an audio file.
 *
 * @summary audio transcription.
 * @azsdk-weight 100
 */

import createClient, { AzureKeyCredential, isUnexpected } from "@azure-rest/openai";
import { readFile } from "fs/promises";

// Load the .env file if it exists
import dotenv from "dotenv";
import { createFile } from "@azure/core-rest-pipeline";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

export async function main() {
  console.log("== Transcribe Audio Sample ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "whisper";
  const audio = await readFile("./assets/audio/countdown.wav");
  const response = await client
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentName)
    .post({
      body: {
        file: createFile(audio, "countdown.wav"),
        filename: "countdown.wav",
        response_format: "text",
      },
      contentType: "multipart/form-data",
    });

  if (isUnexpected(response)) {
    throw new Error(`Failed to transcribe audio: ${JSON.stringify(response.body)}`);
  }
  console.log(`Transcription: ${response.body}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
