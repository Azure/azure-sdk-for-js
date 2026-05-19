// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to combine multiple transcription options for complex scenarios
 * such as meeting transcription.
 *
 * This sample shows how to use speaker diarization, profanity filtering, and custom
 * phrase lists together in a single transcription request.
 *
 * @summary combine multiple transcription options
 */

const {
  TranscriptionClient,
  KnownProfanityFilterModes,
} = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Transcription Options Sample ==");

  const endpoint = process.env.TRANSCRIPTION_ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.TRANSCRIPTION_API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/meeting.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // Combine multiple options for complex transcription scenarios such as meetings
  const result = await client.transcribe(audioFile, {
    // Enable speaker diarization to identify different speakers
    diarizationOptions: {
      maxSpeakers: 5,
    },
    // Mask profanity in the transcription
    profanityFilterMode: KnownProfanityFilterModes.Masked,
    // Add custom phrases to improve recognition of domain-specific terms
    phraseList: {
      phrases: ["action items", "Q4", "KPIs"],
    },
  });

  // Display results
  console.log(`Duration: ${(result.durationInMs / 1000).toFixed(1)}s`);
  console.log();
  console.log("Full Transcript:");
  console.log(result.combinedPhrases[0]?.text);

  // Display per-speaker phrases
  console.log("\nBy Speaker:");
  for (const phrase of result.phrases) {
    console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
