// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use phrase lists to improve transcription accuracy
 * for domain-specific terminology or proper nouns.
 *
 * @summary use phrase lists to improve transcription accuracy
 */

const { TranscriptionClient } = require("@azure/azure-ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Phrase List Sample ==");

  const endpoint = process.env.ENDPOINT || "<endpoint>";
  const apiKey = process.env.API_KEY || "<api-key>";

  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  const audioFilePath = process.env.AUDIO_FILE_PATH || "path/to/audio.wav";

  if (!fs.existsSync(audioFilePath)) {
    console.error(`Audio file not found: ${audioFilePath}`);
    console.log("Please set the AUDIO_FILE_PATH environment variable to a valid audio file.");
    return;
  }

  const audioFile = fs.readFileSync(audioFilePath);

  // Define domain-specific terms that should be recognized accurately
  const domainTerms = [
    "Azure",
    "Cognitive Services",
    "Speech API",
    "TypeScript",
    "JavaScript",
    "npm",
  ];

  console.log("Transcribing with phrase list for improved accuracy...");
  console.log(`Phrase list: ${domainTerms.join(", ")}`);

  const result = await client.transcribe({
    audio: audioFile,
    options: {
      locales: ["en-US"],
      phraseList: {
        phrases: domainTerms,
        biasingWeight: 5.0, // Weight from 1.0 to 20.0 (higher = more influence)
      },
    },
  });

  console.log("\n=== Transcription Results ===");
  console.log(`Duration: ${result.durationMilliseconds}ms\n`);

  console.log("Full Transcript:");
  for (const combined of result.combinedPhrases) {
    console.log(combined.text);
  }

  console.log("\nPhrases:");
  for (const phrase of result.phrases) {
    console.log(`  - ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
