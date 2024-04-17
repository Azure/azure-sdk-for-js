// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/recordedClient.js";
import { OpenAIClient } from "../../src/index.js";
import { AuthMethod } from "./types.js";
import { assert } from "@azure/test-utils";

describe("OpenAI", function () {
  matrix([["AzureAPIKey", "OpenAIKey", "AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let recorder: Recorder;
      let client: OpenAIClient;
      let model: string;

      beforeEach(async function (this: Context) {
        recorder = await startRecorder(this.currentTest);
        client = createClient(authMethod, "dalle", { recorder });
      });

      afterEach(async function () {
        if (recorder) {
          await recorder.stop();
        }
      });

      describe("TextToSpeech", function () {
        it("Simple text to speech request", async function () {
          const prompt = "a monkey eating a banana";
          if (authMethod === "OpenAIKey") {
            model = "tts-1-hd";
          } else {
            model = "tts-hd";
          }
          const result = await client.streamSpeechFromText(model, prompt, "onyx");
          assert.isDefined(result);
          for await (const chunk of result) {
            assert.isNotEmpty(chunk);
          }
        });
      });
    });
  });
});
