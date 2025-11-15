// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchTranscriptionClient, AzureKeyCredential } from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ApiKey", async () => {
    const client = new BatchTranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
  });

  it("ReadmeSampleBasicBatchTranscription", async () => {
    const client = new BatchTranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const transcriptionJob = await client.startTranscription({
      contentUrls: ["https://example.com/audio-file.wav"],
      locale: "en-US",
      displayName: "My Batch Transcription",
    });

    console.log(`Started transcription job: ${transcriptionJob.self}`);
    console.log(`Status: ${transcriptionJob.status}`);
  });

  it("ReadmeSampleMonitorBatchJob", async () => {
    const client = new BatchTranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const transcriptionId = "<transcription-id>";

    // Poll until the transcription completes
    let transcription = await client.getTranscription(transcriptionId);
    while (transcription.status === "Running" || transcription.status === "NotStarted") {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
      transcription = await client.getTranscription(transcriptionId);
      console.log(`Status: ${transcription.status}`);
    }

    console.log(`Final status: ${transcription.status}`);
  });

  it("ReadmeSampleRetrieveResults", async () => {
    const client = new BatchTranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const transcriptionId = "<transcription-id>";

    // Get transcription files
    for await (const file of client.listTranscriptionFiles(transcriptionId)) {
      console.log(`File: ${file.name}`);
      console.log(`Content URL: ${file.links?.contentUrl}`);

      // Download the transcription result from file.links.contentUrl
    }
  });

  it("ReadmeSampleCustomModel", async () => {
    const client = new BatchTranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const transcriptionJob = await client.startTranscription({
      contentUrls: ["https://example.com/audio-file.wav"],
      locale: "en-US",
      displayName: "Transcription with Custom Model",
      model: {
        self: "https://<region>.api.cognitive.microsoft.com/speechtotext/v3.2/models/<model-id>",
      },
    });

    console.log(`Started transcription with custom model: ${transcriptionJob.self}`);
  });

  it("ReadmeSampleListTranscriptions", async () => {
    const client = new BatchTranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    console.log("Listing all transcriptions:");
    for await (const transcription of client.listTranscriptions()) {
      console.log(`- ${transcription.displayName}: ${transcription.status}`);
    }
  });

  it("ReadmeSampleDeleteTranscription", async () => {
    const client = new BatchTranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const transcriptionId = "<transcription-id>";
    await client.deleteTranscription(transcriptionId);

    console.log(`Deleted transcription: ${transcriptionId}`);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
