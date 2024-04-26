// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/recordedClient.js";
import { assertChatCompletions } from "./utils/asserts.js";
import { getDeployments, getModels } from "./utils/utils.js";
import { OpenAIClient } from "../../src/index.js";
import { AuthMethod } from "./types.js";

describe("OpenAI", function () {
  let recorder: Recorder;
  let deployments: string[] = [];
  let models: string[] = [];

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this.currentTest);
    if (!deployments.length || !models.length) {
      deployments = await getDeployments("completions", recorder);
      models = await getModels(recorder);
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  matrix([["AzureAPIKey", "OpenAIKey", "AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: OpenAIClient;

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, "completions", { recorder });
      });

      describe("getChatCompletions", function () {
        it("Describes an image", async function () {
          if (authMethod !== "OpenAIKey") this.skip();
          const url =
            "https://www.nasa.gov/wp-content/uploads/2023/11/53296469002-a92ea42cb9-o.jpg";
          const res = await client.getChatCompletions("gpt-4-vision-preview", [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  imageUrl: {
                    url,
                    detail: "auto",
                  },
                },
              ],
            },
          ]);
          assertChatCompletions(res);
          assert.include(res.choices[0].message?.content, "snow");
        });
      });
    });
  });
});
