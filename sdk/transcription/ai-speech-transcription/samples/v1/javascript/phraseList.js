// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use custom phrase lists to improve transcription accuracy
 * for domain-specific terminology, product names, or proper nouns.
 *
 * @summary use phrase lists to improve transcription accuracy
 */

const { TranscriptionClient } = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Phrase List Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // Add custom phrases to improve recognition of names and domain-specific terms
  const result = await client.transcribe(audioFile, {
    phraseList: {
      phrases: ["Contoso", "Jessie", "Rehaan"],
    },
  });

  console.log("Transcription with custom phrase list:");
  console.log(result.combinedPhrases[0]?.text);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
