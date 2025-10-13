// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to monitor a batch transcription job status in real-time
 * @azsdk-weight 80
 */

import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";
import type { TranscriptionJob } from "@azure/azure-ai-speech-batchtranscription";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * This sample demonstrates how to monitor a batch transcription job and
 * retrieve results once the job completes.
 */
async function main(): Promise<void> {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["SPEECH_ENDPOINT"] || "<endpoint>";
  const apiKey = process.env["SPEECH_API_KEY"] || "<api-key>";
  const transcriptionId = process.env["TRANSCRIPTION_ID"] || "<transcription-id>";

  const client = new BatchTranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  console.log("== Monitor Batch Transcription Job ==");
  console.log(`Transcription ID: ${transcriptionId}`);

  // Get the initial status
  let transcription: TranscriptionJob = await client.getTranscription(transcriptionId);
  console.log(`\nInitial Status: ${transcription.status}`);
  console.log(`Display Name: ${transcription.displayName}`);
  console.log(`Locale: ${transcription.locale}`);
  console.log(`Created: ${transcription.createdDateTime}`);

  // Poll until the transcription completes
  const pollIntervalMs = 5000; // 5 seconds
  let pollCount = 0;

  while (transcription.status === "Running" || transcription.status === "NotStarted") {
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    pollCount++;
    transcription = await client.getTranscription(transcriptionId);

    console.log(`\n[Poll ${pollCount}] Status: ${transcription.status}`);

    if (transcription.properties?.durationInTicks) {
      console.log(`Duration: ${transcription.properties.durationInTicks} ticks`);
    }
  }

  console.log(`\n== Final Status: ${transcription.status} ==`);

  if (transcription.status === "Succeeded") {
    console.log("\n== Transcription Files ==");

    // List all transcription files
    for await (const file of client.listTranscriptionFiles(transcriptionId)) {
      console.log(`\nFile: ${file.name}`);
      console.log(`  Kind: ${file.kind}`);
      console.log(`  Content URL: ${file.links?.contentUrl}`);

      if (file.properties) {
        console.log(`  Size: ${file.properties.size} bytes`);
      }
    }
  } else if (transcription.status === "Failed") {
    console.log("\n== Transcription Failed ==");
    if (transcription.properties?.error) {
      console.log(`Error: ${JSON.stringify(transcription.properties.error, null, 2)}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
