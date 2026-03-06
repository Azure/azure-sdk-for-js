// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to combine multiple transcription options for complex scenarios.
 *
 * @summary combine multiple transcription options
 */

const { TranscriptionClient } = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Transcription Options Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/meeting.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // Combine multiple options for complex transcription scenarios
  const result = await client.transcribe(audioFile, {
    diarizationOptions: {
      maxSpeakers: 5,
    },
    profanityFilterMode: "Masked",
    phraseList: {
      phrases: ["action items", "Q4", "KPIs"],
    },
  });

  console.log(`Duration: ${(result.durationMilliseconds / 1000).toFixed(1)}s`);
  console.log();
  console.log("Full Transcript:");
  console.log(result.combinedPhrases[0]?.text);

  console.log("\nBy Speaker:");
  for (const phrase of result.phrases) {
    console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
