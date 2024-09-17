// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "../utils/recordedClient.js";
import { OpenAIClient } from "../../../src/index.js";
import * as fs from "fs/promises";
import { AudioResultFormat } from "../../../src/models/audio.js";
import { assertAudioResult } from "../utils/asserts.js";
import { AuthMethod } from "../types.js";

function getModel(authMethod: AuthMethod): string {
  return authMethod === "OpenAIKey" ? "whisper-1" : "whisper";
}

describe("OpenAI", function () {
  matrix([["AzureAPIKey", "OpenAIKey", "AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let recorder: Recorder;
      let client: OpenAIClient;

      beforeEach(async function (this: Context) {
        recorder = await startRecorder(this.currentTest);
        client = createClient(authMethod, "whisper", { recorder });
      });

      afterEach(async function () {
        if (recorder) {
          await recorder.stop();
        }
      });

      describe("getAudioTranscription", function () {
        it(`returns json transcription if responseFormat wasn't specified`, async function () {
          const file = await fs.readFile(`./assets/audio/countdown.mp3`);
          const res = await client.getAudioTranscription(getModel(authMethod), file);
          assertAudioResult("json", res);
        });
      });

      describe("getAudioTranslation", function () {
        it(`returns json translation if responseFormat wasn't specified`, async function () {
          const file = await fs.readFile(`./assets/audio/countdown.mp3`);
          const res = await client.getAudioTranslation(getModel(authMethod), file);
          assertAudioResult("json", res);
        });
      });

      matrix(
        [
          ["json", "verbose_json", "srt", "vtt", "text"],
          ["m4a", "mp3", "wav", "ogg", "flac", "webm", "mp4", "mpeg", "oga", "mpga"],
        ] as const,
        async function (format: AudioResultFormat, extension: string) {
          describe("getAudioTranscription", function () {
            it(`returns ${format} transcription for ${extension} files`, async function () {
              const file = await fs.readFile(`./assets/audio/countdown.${extension}`);
              const res = await client.getAudioTranscription(getModel(authMethod), file, format);
              assertAudioResult(format, res);
            });
          });

          describe("getAudioTranslation", function () {
            it(`returns ${format} translation for ${extension} files`, async function () {
              const file = await fs.readFile(`./assets/audio/countdown.${extension}`);
              const res = await client.getAudioTranslation(getModel(authMethod), file, format);
              assertAudioResult(format, res);
            });
          });
        },
      );
    });
  });
});
