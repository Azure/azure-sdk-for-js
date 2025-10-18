// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TranscriptionClient } from "../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import * as fs from "fs";

describe("snippets", () => {
  it("ApiKeyAuthentication", async () => {
    // @ts-ignore
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));
  });

  it("AzureADAuthentication", async () => {
    // @ts-ignore
    const client = new TranscriptionClient("<endpoint>", new DefaultAzureCredential());
  });

  it("BrowserAuthentication", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    // @ts-ignore
    const client = new TranscriptionClient("<endpoint>", credential);
  });

  it("TranscribeAudio", async () => {
    async function main() {
      // Using API Key authentication
      const client = new TranscriptionClient(
        "https://your-resource.cognitiveservices.azure.com/",
        new AzureKeyCredential("your-api-key"),
      );

      // Read audio file
      const audioFile = fs.readFileSync("path/to/audio.wav");

      // Transcribe the audio
      // @ts-ignore
      const result = await client.transcribe({
        audio: audioFile,
      });

      console.log("Transcription:", result.combinedPhrases[0].text);
    }

    // @ts-ignore
    main().catch(console.error);
  });

  it("ReadmeSampleTranscriptionWithLocale", async () => {
    const endpoint = process.env.ENDPOINT ?? "<endpoint>";
    const apiKey = process.env.API_KEY ?? "<api-key>";
    const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

    const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
    const audioFile = fs.existsSync(audioFilePath)
      ? fs.readFileSync(audioFilePath)
      : Buffer.from([]);

    // @ts-ignore
    const result = await client.transcribe({
      audio: audioFile,
      options: {
        locales: ["en-US", "es-ES"],
      },
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("ReadmeSampleSpeakerDiarization", async () => {
    const endpoint = process.env.ENDPOINT ?? "<endpoint>";
    const apiKey = process.env.API_KEY ?? "<api-key>";
    const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

    const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
    const audioFile = fs.existsSync(audioFilePath)
      ? fs.readFileSync(audioFilePath)
      : Buffer.from([]);

    // @ts-ignore
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
  });

  it("ReadmeSampleProfanityFiltering", async () => {
    const endpoint = process.env.ENDPOINT ?? "<endpoint>";
    const apiKey = process.env.API_KEY ?? "<api-key>";
    const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

    const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
    const audioFile = fs.existsSync(audioFilePath)
      ? fs.readFileSync(audioFilePath)
      : Buffer.from([]);

    // @ts-ignore
    const result = await client.transcribe({
      audio: audioFile,
      options: {
        locales: ["en-US"],
        profanityFilterMode: "Masked", // Options: "None", "Removed", "Tags", "Masked"
      },
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("ReadmeSamplePhraseList", async () => {
    const endpoint = process.env.ENDPOINT ?? "<endpoint>";
    const apiKey = process.env.API_KEY ?? "<api-key>";
    const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

    const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
    const audioFile = fs.existsSync(audioFilePath)
      ? fs.readFileSync(audioFilePath)
      : Buffer.from([]);

    // @ts-ignore
    const result = await client.transcribe({
      audio: audioFile,
      options: {
        locales: ["en-US"],
        phraseList: {
          phrases: ["Azure", "Cognitive Services", "Speech API"],
          biasingWeight: 5.0, // Weight from 1.0 to 20.0
        },
      },
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("ReadmeSampleTranscriptionFromUrl", async () => {
    const endpoint = process.env.ENDPOINT ?? "<endpoint>";
    const apiKey = process.env.API_KEY ?? "<api-key>";
    const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

    const audioUrl = process.env.AUDIO_URL ?? "https://example.com/audio.wav";

    // @ts-ignore
    const result = await client.transcribe({
      options: {
        audioUrl: audioUrl,
        locales: ["en-US"],
      },
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("EnableLogging", async () => {
    setLogLevel("info");
  });
});
