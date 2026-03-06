// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe audio with multilingual content.
 *
 * @summary transcribe multilingual audio content (preview)
 */

const { TranscriptionClient } = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Multilingual Transcription Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/multilingual-audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // For multilingual content, do not specify any locales.
  const result = await client.transcribe(audioFile);

  console.log("Multilingual Transcription:");
  console.log(result.combinedPhrases[0]?.text);

  console.log("\nPhrases by detected locale:");
  for (const phrase of result.phrases) {
    console.log(`[${phrase.locale}] ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
