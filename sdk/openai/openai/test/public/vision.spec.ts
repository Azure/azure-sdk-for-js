// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils";
import { assert, describe, beforeEach, it } from "vitest";
import { createClient } from "./utils/createClient.js";
import { assertChatCompletions } from "./utils/asserts.js";
import { APIMatrix, APIVersion, getDeployments } from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";

describe("OpenAI", function () {
  let deployments: string[] = [];

  beforeEach(async function () {
    if (!deployments.length) {
      deployments = await getDeployments("completions");
    }
  });

  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function () {
        client = createClient(apiVersion, "dalle");
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
          assert.isTrue(res.choices[0].message?.content?.includes("snow") || res.choices[0].message?.content?.includes("icy"));
        });
      });
    });
  });
});
