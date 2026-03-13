// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe audio files from remote URLs using the
 * Azure AI Speech Transcription service.
 *
 * @summary transcribe audio from a URL
 */

import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Transcription from URL Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  // Transcribe audio directly from a publicly accessible URL
  // No audio file download needed - the service fetches the file from the URL
  const audioUrl =
    process.env.AUDIO_URL ??
    "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-speech-sdk/master/sampledata/audiofiles/aboutSpeechSdk.wav";
  const result = await client.transcribe(audioUrl);

  console.log(`Transcribed audio from URL: ${audioUrl}`);
  console.log(`Duration: ${result.durationInMs}ms`);
  console.log("\nTranscription:", result.combinedPhrases[0]?.text);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
