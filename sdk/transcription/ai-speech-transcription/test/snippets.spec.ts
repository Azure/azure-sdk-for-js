// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TranscriptionClient, KnownServiceApiVersions } from "../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { readFileSync } from "node:fs";

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

  it("SelectApiVersion", async () => {
    // @ts-ignore
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"), {
      serviceVersion: KnownServiceApiVersions.V20251015,
    });
  });

  it("TranscribeLocalFile", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/audio.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile);

    console.log(`Duration: ${result.durationMilliseconds}ms`);
    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("TranscribeFromUrl", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    // @ts-ignore
    const result = await client.transcribe("https://example.com/audio/sample.wav", {
      locales: ["en-US"],
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("AccessTranscribedWords", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/audio.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile);

    for (const phrase of result.phrases) {
      console.log(`Phrase: ${phrase.text}`);
      console.log(
        `  Offset: ${phrase.offsetMilliseconds}ms | Duration: ${phrase.durationMilliseconds}ms`,
      );
      console.log(`  Confidence: ${phrase.confidence.toFixed(2)}`);

      // Access individual words in the phrase
      for (const word of phrase.words ?? []) {
        console.log(`    Word: '${word.text}' | Offset: ${word.offsetMilliseconds}ms`);
      }
    }
  });

  it("TranscribeWithDiarization", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/conversation.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      diarizationOptions: {
        maxSpeakers: 4, // Expect up to 4 speakers in the conversation
      },
    });

    for (const phrase of result.phrases) {
      console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
    }
  });

  it("TranscribeWithProfanityFilter", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/audio.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      profanityFilterMode: "Masked", // Default - profanity replaced with asterisks
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("TranscribeWithPhraseList", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/audio.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      phraseList: {
        phrases: ["Contoso", "Jessie", "Rehaan"],
      },
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("TranscribeWithKnownLocale", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/english-audio.mp3");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      locales: ["en-US"],
    });

    console.log("Transcription:", result.combinedPhrases[0]?.text);
  });

  it("TranscribeWithLanguageIdentification", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/audio.mp3");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      locales: ["en-US", "es-ES"],
    });

    for (const phrase of result.phrases) {
      console.log(`[${phrase.locale}] ${phrase.text}`);
    }
  });

  it("TranscribeWithEnhancedMode", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/audio.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      // Enhanced mode: LLM-powered speech recognition with prompt customization
      enhancedMode: {
        task: "transcribe",
        prompt: ["Output must be in lexical format."],
      },
      // Existing Fast Transcription options work alongside enhanced mode
      diarizationOptions: {
        maxSpeakers: 2,
      },
      profanityFilterMode: "Masked",
      activeChannels: [0, 1],
    });

    for (const phrase of result.phrases) {
      console.log(`[Speaker ${phrase.speaker}] ${phrase.text}`);
    }
  });

  it("TranslateWithEnhancedMode", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/chinese-audio.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      enhancedMode: {
        task: "translate",
        targetLanguage: "ko", // Translate to Korean
      },
      profanityFilterMode: "Masked",
    });

    console.log("Translated to Korean:", result.combinedPhrases[0]?.text);
  });

  it("TranscribeWithMultipleOptions", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/meeting.wav");
    // @ts-ignore
    const result = await client.transcribe(audioFile, {
      // Enable speaker diarization
      diarizationOptions: {
        maxSpeakers: 5,
      },
      // Mask profanity
      profanityFilterMode: "Masked",
      // Add custom phrases
      phraseList: {
        phrases: ["action items", "Q4", "KPIs"],
      },
    });

    console.log("Full Transcript:");
    console.log(result.combinedPhrases[0]?.text);

    for (const phrase of result.phrases) {
      console.log(`Speaker ${phrase.speaker}: ${phrase.text}`);
    }
  });

  it("MultilingualTranscription", async () => {
    const client = new TranscriptionClient("<endpoint>", new AzureKeyCredential("<api-key>"));

    const audioFile = readFileSync("path/to/multilingual-audio.wav");
    // For multilingual content, do not specify any locales.
    // @ts-ignore
    const result = await client.transcribe(audioFile);

    console.log("Multilingual Transcription:");
    console.log(result.combinedPhrases[0]?.text);

    // Each phrase includes the detected locale
    for (const phrase of result.phrases) {
      console.log(`[${phrase.locale}] ${phrase.text}`);
    }
  });

  it("EnableLogging", async () => {
    setLogLevel("info");
  });
});
