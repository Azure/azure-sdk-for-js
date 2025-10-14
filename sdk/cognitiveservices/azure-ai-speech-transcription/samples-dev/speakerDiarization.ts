// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe an audio file with speaker diarization enabled.
 *
 * Speaker diarization identifies and separates different speakers in the audio.
 *
 * @summary identify and separate different speakers in audio
 * @azsdk-weight 80
 */

import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Speaker Diarization Sample ==");

  // <ReadmeSampleSpeakerDiarization>
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
  const result = await client.transcribe({
    audio: audioFile,
    options: {
      locales: ["en-US"],
      diarization: {
        enabled: true,
        maxSpeakers: 4,
      },
    },
  });
  // Access speaker information from the results
  for (const phrase of result.phrases || []) {
    console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
  }
  // </ReadmeSampleSpeakerDiarization>

  console.log("\n=== Transcription with Speaker Information ===");
  console.log(`Duration: ${result.durationMilliseconds}ms\n`);

  // Group phrases by speaker
  const speakerMap = new Map<number, string[]>();
  for (const phrase of result.phrases) {
    const speaker = phrase.speaker ?? 0;
    if (!speakerMap.has(speaker)) {
      speakerMap.set(speaker, []);
    }
    speakerMap.get(speaker)!.push(phrase.text);
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
