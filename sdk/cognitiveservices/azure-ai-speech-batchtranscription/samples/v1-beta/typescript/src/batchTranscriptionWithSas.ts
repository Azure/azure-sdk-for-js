// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to transcribe audio files using SAS URLs
 * @azsdk-weight 60
 */

import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";
import type { TranscriptionJob } from "@azure/azure-ai-speech-batchtranscription";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * This sample demonstrates how to use SAS URLs for batch transcription.
 * SAS URLs allow secure access to audio files stored in Azure Blob Storage
 * without making the files publicly accessible.
 */
async function main(): Promise<void> {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["SPEECH_ENDPOINT"] || "<endpoint>";
  const apiKey = process.env["SPEECH_API_KEY"] || "<api-key>";

  // Example SAS URL format:
  // https://<storage-account>.blob.core.windows.net/<container>/<file>?<sas-token>
  const audioSasUrl =
    process.env["AUDIO_SAS_URL"] ||
    "https://mystorageaccount.blob.core.windows.net/audio/recording.wav?sv=2021-08-06&ss=b&srt=o&sp=r&se=2025-12-31T23:59:59Z&st=2025-01-01T00:00:00Z&spr=https&sig=...";

  const client = new BatchTranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  console.log("== Create Batch Transcription with SAS URL ==");

  // Create a batch transcription job using SAS URL
  const transcriptionJob = await client.startTranscription({
    contentUrls: [audioSasUrl],
    locale: "en-US",
    displayName: "Transcription with SAS URL",
    properties: {
      // Optional: Specify additional properties
      wordLevelTimestampsEnabled: true,
      punctuationMode: "DictatedAndAutomatic",
      profanityFilterMode: "Masked",
    },
  });

  console.log(`Started transcription job: ${transcriptionJob.self}`);
  console.log(`Status: ${transcriptionJob.status}`);

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

    for await (const file of client.listTranscriptionFiles(transcriptionId)) {
      console.log(`\nFile: ${file.name}`);
      console.log(`Kind: ${file.kind}`);
      console.log(`Content URL: ${file.links?.contentUrl}`);

      // The content URL is also a SAS URL that can be used to download the transcription result
      if (file.kind === "Transcription" && file.links?.contentUrl) {
        console.log(
          "\nTo download the transcription, use the Content URL in your browser or HTTP client.",
        );
        console.log("The URL is valid for a limited time.");
      }
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
