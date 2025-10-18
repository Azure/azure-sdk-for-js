// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe an audio file with speaker diarization enabled.
 *
 * Speaker diarization identifies and separates different speakers in the audio.
 *
 * @summary identify and separate different speakers in audio
 */

const { TranscriptionClient } = require("@azure/azure-ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Speaker Diarization Sample ==");

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

  console.log("Transcribing with speaker diarization...");
  const result = await client.transcribe({
    audio: audioFile,
    options: {
      locales: ["en-US"],
      diarization: {
        enabled: true,
        maxSpeakers: 4, // Hint for maximum number of speakers
      },
    },
  });

  console.log("\n=== Transcription with Speaker Information ===");
  console.log(`Duration: ${result.durationMilliseconds}ms\n`);

  // Group phrases by speaker
  const speakerMap = new Map();
  for (const phrase of result.phrases) {
    const speaker = phrase.speaker ?? 0;
    if (!speakerMap.has(speaker)) {
      speakerMap.set(speaker, []);
    }
    speakerMap.get(speaker).push(phrase.text);
  }

  console.log("Transcription by Speaker:");
  for (const [speaker, texts] of speakerMap.entries()) {
    console.log(`\nSpeaker ${speaker}:`);
    texts.forEach((text) => console.log(`  - ${text}`));
  }

  console.log("\n\nDetailed Phrases with Timing:");
  for (const phrase of result.phrases) {
    const speaker = phrase.speaker !== undefined ? ` (Speaker ${phrase.speaker})` : "";
    console.log(
      `[${phrase.offsetMilliseconds}ms - ${phrase.offsetMilliseconds + phrase.durationMilliseconds}ms]${speaker}: ${phrase.text}`,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
