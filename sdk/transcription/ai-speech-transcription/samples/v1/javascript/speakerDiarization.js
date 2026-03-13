// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe an audio file with speaker diarization enabled.
 *
 * @summary identify and separate different speakers in audio
 */

const { TranscriptionClient } = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Speaker Diarization Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/conversation.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // Enable speaker diarization by specifying maxSpeakers.
  const result = await client.transcribe(audioFile, {
    diarizationOptions: {
      maxSpeakers: 4,
    },
  });

  console.log("Transcription with speaker diarization:");
  for (const phrase of result.phrases) {
    console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
