// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, matrix } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createClient } from "../utils/createClient.js";
import { AuthMethod } from "../utils/types.js";
import OpenAI from "openai";

describe("Embeddings", function () {
  matrix([["OpenAIKey"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: OpenAI;

      beforeEach(async function (this: Context) {
        client = createClient("embedding");
      });

      describe("getEmbeddings", function () {
        it("embeddings test", async function () {
          const prompt = ["This is text to be embedded"];
          const embeddings = await client.embeddings.create({ model: "", input: prompt });
          assert.isNotNull(embeddings.data);
          assert.equal(embeddings.data.length > 0, true);
          assert.isNotNull(embeddings.data[0].embedding);
          assert.equal(embeddings.data[0].embedding.length > 0, true);
          assert.isNotNull(embeddings.usage);
        });
      });
    });
  });
});
