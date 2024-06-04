// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/createClient.js";
import { assertChatCompletions } from "./utils/asserts.js";
import { getModels } from "./utils/utils.js";
import { AuthMethod } from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";

describe("OpenAI", function () {
  let recorder: Recorder;
  let deployments: string[] = [];
  let models: string[] = [];

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this.currentTest);
    if (!deployments.length || !models.length) {
      // deployments = await getDeployments("completions", recorder);
      models = await getModels(recorder);
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  matrix([["AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, "completions");
      });

      describe("getChatCompletions", function () {
        // TODO: Unskip the test when it works for Azure client
        it("Describes an image", async function () {
          const url =
            "https://www.nasa.gov/wp-content/uploads/2023/11/53296469002-a92ea42cb9-o.jpg";
          const res = await client.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "What’s in this image?",
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url,
                      detail: "auto",
                    },
                  },
                ],
              },
            ],
          });
          assertChatCompletions(res);
          assert.include(res.choices[0].message?.content, "snow");
        });
      });
    });
  });
});
