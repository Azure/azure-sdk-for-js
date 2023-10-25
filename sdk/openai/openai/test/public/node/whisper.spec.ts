// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { AuthMethod, createClient, startRecorder } from "../utils/recordedClient.js";
import { OpenAIClient } from "../../../src/index.js";
import * as fs from "fs/promises";
import { AudioResultFormat } from "../../../src/models/audio.js";
import {
  formDataPolicyName,
  formDataWithFileUploadPolicy,
} from "../../../src/api/policies/formDataPolicy.js";
import { assertAudioResult } from "../utils/asserts.js";

function getModel(authMethod: AuthMethod): string {
  return authMethod === "OpenAIKey" ? "whisper-1" : "whisper";
}

describe("OpenAI", function () {
  matrix([["AzureAPIKey", "OpenAIKey", "AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let recorder: Recorder;
      let client: OpenAIClient;
      before(async function (this: Context) {
        if (process.version.startsWith("v16")) {
          this.skip();
        }
      });

      beforeEach(async function (this: Context) {
        recorder = await startRecorder(this.currentTest);
        client = createClient(authMethod, { recorder });
        client["_client"].pipeline.removePolicy({ name: formDataPolicyName });
        client["_client"].pipeline.addPolicy(formDataWithFileUploadPolicy("6ceck6po4ai0tb2u"));
      });

      afterEach(async function () {
        if (recorder) {
          await recorder.stop();
        }
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
        }
      );
    });
  });
});
