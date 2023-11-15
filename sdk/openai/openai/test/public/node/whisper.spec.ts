// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { AuthMethod, createClient, startRecorder } from "../utils/recordedClient.js";
import { OpenAIClient } from "../../../src/index.js";
import { readFile } from "fs/promises";
import { AudioResultFormat } from "../../../src/models/audio.js";
import { assertAudioResult } from "../utils/asserts.js";
import { getModel, stretchWAV } from "./util.js";

describe("OpenAI", function () {
  matrix([["AzureAPIKey", "OpenAIKey", "AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let recorder: Recorder;
      let client: OpenAIClient;

      beforeEach(async function (this: Context) {
        recorder = await startRecorder(this.currentTest);
        client = createClient(authMethod, { recorder });
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
              const file = await readFile(`./assets/audio/countdown.${extension}`);
              const res = await client.getAudioTranscription(getModel(authMethod), file, format);
              assertAudioResult(format, res);
            });
          });

          describe("getAudioTranslation", function () {
            it(`returns ${format} translation for ${extension} files`, async function () {
              const file = await readFile(`./assets/audio/countdown.${extension}`);
              const res = await client.getAudioTranslation(getModel(authMethod), file, format);
              assertAudioResult(format, res);
            });
          });
        }
      );
    });
  });

  describe("Memory Usage", function () {
    let recorder: Recorder;
    let client: OpenAIClient;
    const authMethod: AuthMethod = "OpenAIKey";
    beforeEach(async function (this: Context) {
      recorder = await startRecorder(this.currentTest);
      client = createClient(authMethod, { recorder });
    });

    afterEach(async function () {
      if (recorder) {
        await recorder.stop();
      }
    });

    it("stream 10MB file without loading it", async function () {
      let curMem = -1;
      const timer = setInterval(() => {
        if (!global.gc) {
          assert.fail("global.gc not available");
        }
        global.gc();
        const mem = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
        if (curMem === -1) {
          curMem = mem;
        } else if (mem - curMem > 1) {
          assert.fail(`Memory usage increased by ${mem - curMem} MB`);
        }
      }, 100);
      const file = await readFile(`./assets/audio/countdown.wav`);
      try {
        const res = await client.getAudioTranscription(getModel(authMethod), () =>
          stretchWAV(file, 10)
        );
        assertAudioResult("json", res);
      } finally {
        clearInterval(timer);
      }
    });
  });
});
