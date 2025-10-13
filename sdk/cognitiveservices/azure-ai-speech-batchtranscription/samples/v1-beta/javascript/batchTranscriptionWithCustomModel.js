// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to transcribe audio using a custom trained speech model
 */

const {
  BatchTranscriptionClient,
  AzureKeyCredential,
} = require("@azure/azure-ai-speech-batchtranscription");
// Load the .env file if it exists
require("dotenv").config();

/**
 * This sample demonstrates how to use a custom speech model for batch transcription.
 * Custom models can improve transcription accuracy for domain-specific terminology.
 */
async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["SPEECH_ENDPOINT"] || "<endpoint>";
  const apiKey = process.env["SPEECH_API_KEY"] || "<api-key>";
  const customModelUrl =
    process.env["SPEECH_CUSTOM_MODEL_URL"] ||
    "https://<region>.api.cognitive.microsoft.com/speechtotext/v3.2/models/<model-id>";

  const client = new BatchTranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  console.log("== Create Batch Transcription with Custom Model ==");

  // Create a batch transcription job with a custom model
  const transcriptionJob = await client.startTranscription({
    contentUrls: ["https://example.com/audio-file.wav"],
    locale: "en-US",
    displayName: "Transcription with Custom Model",
    model: {
      self: customModelUrl,
    },
  });

  console.log(`Started transcription job with custom model: ${transcriptionJob.self}`);
  console.log(`Model: ${transcriptionJob.model?.self}`);
  console.log(`Status: ${transcriptionJob.status}`);

  // Extract the transcription ID from the self URL
  const transcriptionId = transcriptionJob.self?.split("/").pop() || "";

  console.log("\n== Monitor Transcription Progress ==");

  // Poll until the transcription completes
  let currentTranscription = transcriptionJob;
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
      console.log(`Content URL: ${file.links?.contentUrl}`);
    }
  }

  console.log("\n== Clean Up ==");
  await client.deleteTranscription(transcriptionId);
  console.log(`Deleted transcription: ${transcriptionId}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
