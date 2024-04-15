// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "../utils/recordedClient.js";
import { OpenAIClient } from "../../../src/index.js";
import * as fs from "fs";
import { AuthMethod } from "../types.js";
import { assert } from "@azure/test-utils";
describe.only("OpenAI", function () {
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
          if (authMethod === "OpenAIKey"){
            model = "tts-1-hd"
          } else {
            model = "tts-hd"
          }
          const result = await client.streamSpeechFromText(model, prompt, "onyx")
          if (!result) {
            throw new Error("e")
          }
          for await (const chunk of result) {
            assert.isNotEmpty(chunk);
            console.log(chunk)
            fs.writeFile(`./test${authMethod}.mp3`, chunk, { flag: "a" }, (err: any) => {
              if (err) {
                throw new Error(err)
              }
            }
            )
          }
        });
      });
    });
  });
});
