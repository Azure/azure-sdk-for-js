// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { createClient } from "../utils/createClient";
import { AuthMethod } from "../utils/types";
import OpenAI from "openai";

describe("Images", function () {
  matrix([["OpenAIKey"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: OpenAI;
      let modelName: string;

      beforeEach(async function (this: Context) {
        client = createClient();
        modelName = "dall-e-3";
      });

      describe("getImages", function () {
        it("images test", async function () {
          const prompt = "A dolphin baking cakes";
          const image = await client.images.generate({
            model: modelName,
            prompt,
          });
          assert.isNotNull(image);
          assert.isArray(image.data);
          image.data.forEach((object) => {
            assert.isString(object.url);
          });
        });
      });
    });
  });
});
