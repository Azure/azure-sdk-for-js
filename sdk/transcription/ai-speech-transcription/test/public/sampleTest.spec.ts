// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, createClient, ASSET_PATH } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { TranscriptionClient } from "../../src/index.js";
import { createReadStream, readFileSync } from "node:fs";
import { join } from "node:path";

const SAMPLE_AUDIO_FILE = "sample-whatstheweatherlike-en.mp3";
const SAMPLE_PROFANITY_FILE = "sample-profanity.wav";

describe("TranscriptionClient", () => {
  let recorder: Recorder;
  let client: TranscriptionClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // #region Client Construction Tests

  describe("Client Construction", () => {
    it("can create client", async function () {
      assert.isNotNull(client);
      assert.isNotNull(client.pipeline);
    });

    it("client options can be configured", async function () {
      const configuredClient = createClient(recorder, {
        serviceVersion: "2025-10-15",
      });
      assert.isNotNull(configuredClient);
      assert.isNotNull(configuredClient.pipeline);
    });
  });

  // #endregion

  // #region Basic Transcription Tests

  describe("Basic Transcription", () => {
    it("transcribe audio buffer", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
      });

      assert.isNotNull(result);
      assert.isAbove(result.durationMilliseconds, 0);
      assert.isNotNull(result.combinedPhrases);
      assert.isNotNull(result.phrases);
    });

    it("transcribe audio stream with multiple locales", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US", "es-ES"],
      });

      assert.isNotNull(result);
      assert.isAbove(result.durationMilliseconds, 0);
    });

    it("transcribe from readable stream", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioStream = createReadStream(audioPath);

      const result = await client.transcribe(audioStream, {
        locales: ["en-US"],
      });

      assert.isNotNull(result);
      assert.isAbove(result.durationMilliseconds, 0);
      assert.isNotNull(result.phrases);
    });

    it("transcribe from audio URL", async function () {
      const audioUrl =
        "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-speech-sdk/master/sampledata/audiofiles/aboutSpeechSdk.wav";

      const result = await client.transcribe(audioUrl, {
        locales: ["en-US"],
      });

      assert.isNotNull(result);
      assert.isAbove(result.durationMilliseconds, 0);
    });
  });

  // #endregion

  // #region Profanity Filter Tests

  describe("Profanity Filter", () => {
    it("transcribe with profanity filter masked", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_PROFANITY_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        profanityFilterMode: "Masked",
      });

      assert.isNotNull(result);
      assert.isNotNull(result.combinedPhrases);
    });

    it("transcribe with profanity filter removed", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_PROFANITY_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        profanityFilterMode: "Removed",
      });

      assert.isNotNull(result);
      assert.isNotNull(result.combinedPhrases);
    });

    it("transcribe with profanity filter none", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_PROFANITY_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        profanityFilterMode: "None",
      });

      assert.isNotNull(result);
      assert.isNotNull(result.combinedPhrases);
    });
  });

  // #endregion

  // #region Diarization Tests

  describe("Diarization", () => {
    it("transcribe with diarization", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        diarizationOptions: {
          maxSpeakers: 2,
        },
      });

      assert.isNotNull(result);
      assert.isNotNull(result.phrases);
    });

    it("transcribe with diarization max speakers", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        diarizationOptions: {
          maxSpeakers: 5,
        },
      });

      assert.isNotNull(result);
      assert.isNotNull(result.phrases);
    });
  });

  // #endregion

  // #region Phrase List Tests

  describe("Phrase List", () => {
    it("transcribe with phrase list", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        phraseList: {
          phrases: ["weather", "forecast"],
        },
      });

      assert.isNotNull(result);
      assert.isNotNull(result.combinedPhrases);
    });
  });

  // #endregion

  // #region Enhanced Mode Tests

  describe("Enhanced Mode", () => {
    it("transcribe with enhanced mode", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        enhancedMode: {
          task: "transcribe",
        },
      });

      assert.isNotNull(result);
      assert.isNotNull(result.combinedPhrases);
    });
  });

  // #endregion

  // #region Channel Tests

  describe("Channels", () => {
    it("transcribe with active channels", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        activeChannels: [0],
      });

      assert.isNotNull(result);
      assert.isNotNull(result.combinedPhrases);
    });
  });

  // #endregion

  // #region Combined Options Tests

  describe("Combined Options", () => {
    it("transcribe with multiple options", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
        profanityFilterMode: "Masked",
        diarizationOptions: {
          maxSpeakers: 3,
        },
        phraseList: {
          phrases: ["weather"],
        },
      });

      assert.isNotNull(result);
      assert.isNotNull(result.combinedPhrases);
      assert.isNotNull(result.phrases);
    });
  });

  // #endregion

  // #region TranscriptionResult Tests

  describe("TranscriptionResult", () => {
    it("result has duration", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
      });

      assert.isAbove(result.durationMilliseconds, 0);
    });

    it("result has combined phrases", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
      });

      assert.isNotNull(result.combinedPhrases);
      assert.isAbove(result.combinedPhrases.length, 0);
      assert.isNotEmpty(result.combinedPhrases[0].text);
    });

    it("result has phrases with details", async function () {
      const audioPath = join(ASSET_PATH, SAMPLE_AUDIO_FILE);
      const audioBuffer = readFileSync(audioPath);

      const result = await client.transcribe(audioBuffer, {
        locales: ["en-US"],
      });

      const phrases = result.phrases;
      assert.isNotNull(phrases);
      assert.isAbove(phrases.length, 0);

      for (const phrase of phrases) {
        assert.isNotNull(phrase);
        assert.isNotEmpty(phrase.text);
        assert.isNumber(phrase.confidence);
        assert.isNumber(phrase.offsetMilliseconds);
        assert.isNumber(phrase.durationMilliseconds);
      }
    });
  });

  // #endregion
});
