// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to list all batch transcription jobs
 * @azsdk-weight 70
 */

import { BatchTranscriptionClient, AzureKeyCredential } from "@azure/azure-ai-speech-batchtranscription";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

/**
 * This sample demonstrates how to list all batch transcription jobs
 * for your subscription and filter by status.
 */
async function main(): Promise<void> {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["SPEECH_ENDPOINT"] || "<endpoint>";
  const apiKey = process.env["SPEECH_API_KEY"] || "<api-key>";

  const client = new BatchTranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  console.log("== List All Batch Transcriptions ==");

  let totalCount = 0;
  const statusCounts: Record<string, number> = {};

  for await (const transcription of client.listTranscriptions()) {
    totalCount++;

    // Count by status
    const status = transcription.status || "Unknown";
    statusCounts[status] = (statusCounts[status] || 0) + 1;

    console.log(`\n[${totalCount}] ${transcription.displayName}`);
    console.log(`  ID: ${transcription.self?.split("/").pop()}`);
    console.log(`  Status: ${transcription.status}`);
    console.log(`  Locale: ${transcription.locale}`);
    console.log(`  Created: ${transcription.createdDateTime}`);

    if (transcription.model?.self) {
      console.log(`  Model: ${transcription.model.self}`);
    }

    if (transcription.properties?.durationInTicks) {
      console.log(`  Duration: ${transcription.properties.durationInTicks} ticks`);
    }
  }

  console.log(`\n== Summary ==`);
  console.log(`Total Transcriptions: ${totalCount}`);
  console.log("\nBy Status:");
  for (const [status, count] of Object.entries(statusCounts)) {
    console.log(`  ${status}: ${count}`);
  }

  // Example: Filter transcriptions by status
  console.log("\n== Succeeded Transcriptions Only ==");
  let succeededCount = 0;

  for await (const transcription of client.listTranscriptions()) {
    if (transcription.status === "Succeeded") {
      succeededCount++;
      console.log(`  - ${transcription.displayName} (${transcription.createdDateTime})`);
    }
  }

  console.log(`\nTotal Succeeded: ${succeededCount}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
