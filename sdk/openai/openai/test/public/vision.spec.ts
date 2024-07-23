// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils";
import { assert, describe, beforeEach, afterEach, it } from "vitest";
import { createClient, startRecorder } from "./utils/createClient.js";
import { assertChatCompletions } from "./utils/asserts.js";
import { APIMatrix, APIVersion, AuthMethod, authTypes, getDeployments } from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";

describe("OpenAI", function () {
  let recorder: Recorder;
  let deployments: string[] = [];

  beforeEach(async function (context) {
    recorder = await startRecorder(context);
    if (!deployments.length) {
      deployments = await getDeployments("completions", recorder);
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  matrix([authTypes] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
        describe(`[${apiVersion}] Client`, () => {
          let client: AzureOpenAI | OpenAI;

          beforeEach(async function () {
            client = createClient(authMethod, apiVersion, "dalle");
          });

          describe("getChatCompletions", function () {
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
  });
});
