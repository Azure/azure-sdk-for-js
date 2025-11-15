// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to create and monitor a basic batch transcription job
 * @azsdk-weight 100
 */

import {
  BatchTranscriptionClient,
  AzureKeyCredential,
} from "@azure/azure-ai-speech-batchtranscription";
import type { TranscriptionJob } from "@azure/azure-ai-speech-batchtranscription";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * This sample demonstrates how to create a batch transcription job and monitor its progress.
 */
async function main(): Promise<void> {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["SPEECH_ENDPOINT"] || "<endpoint>";
  const apiKey = process.env["SPEECH_API_KEY"] || "<api-key>";

  const client = new BatchTranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  console.log("== Create Batch Transcription Job ==");

  // Create a batch transcription job
  const transcriptionJob = await client.startTranscription({
    contentUrls: ["https://example.com/audio-file.wav"],
    locale: "en-US",
    displayName: "My First Batch Transcription",
  });

  console.log(`Started transcription job: ${transcriptionJob.self}`);
  console.log(`Display Name: ${transcriptionJob.displayName}`);
  console.log(`Initial Status: ${transcriptionJob.status}`);

  // Extract the transcription ID from the self URL
  const transcriptionId = transcriptionJob.self?.split("/").pop() || "";

  console.log("\n== Monitor Transcription Progress ==");

  // Poll until the transcription completes
  let currentTranscription: TranscriptionJob = transcriptionJob;
  while (
    currentTranscription.status === "Running" ||
    currentTranscription.status === "NotStarted"
  ) {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
    currentTranscription = await client.getTranscription(transcriptionId);
    console.log(`Status: ${currentTranscription.status}`);
  }

  console.log(`\nFinal Status: ${currentTranscription.status}`);

  if (currentTranscription.status === "Succeeded") {
    console.log("\n== Retrieve Transcription Results ==");

    // Get the transcription files
    for await (const file of client.listTranscriptionFiles(transcriptionId)) {
      console.log(`\nFile: ${file.name}`);
      console.log(`Kind: ${file.kind}`);
      console.log(`Content URL: ${file.links?.contentUrl}`);
    }
  } else {
    console.log(`Transcription failed or was cancelled.`);
    if (currentTranscription.properties?.error) {
      console.log(`Error: ${JSON.stringify(currentTranscription.properties.error)}`);
    }
  }

  console.log("\n== Clean Up ==");
  await client.deleteTranscription(transcriptionId);
  console.log(`Deleted transcription: ${transcriptionId}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
