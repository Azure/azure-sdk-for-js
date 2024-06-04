// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, matrix } from "@azure-tools/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/createClient.js";
import { getDeployments, getModels } from "./utils/utils.js";
import { AuthMethod } from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";
import { assertOpenAiError } from "./utils/asserts.js";

describe("Embeddings", function () {
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

  matrix([["AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      let deploymentName: string;

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, "completions");
        deploymentName = "text-embedding-ada-002";
      });

      describe("getEmbeddings", function () {
        it("embeddings test", async function () {
          const prompt = ["This is text to be embedded"];
          const embeddings = await client.embeddings.create({
            model: deploymentName,
            input: prompt,
          });
          assert.isNotNull(embeddings.data);
          assert.equal(embeddings.data.length > 0, true);
          assert.isNotNull(embeddings.data[0].embedding);
          assert.equal(embeddings.data[0].embedding.length > 0, true);
          assert.isNotNull(embeddings.usage);
        });

        it("wrong prompt type", async function () {
          // TODO: Update the error message expectations
          await assertOpenAiError(
            client.embeddings.create({ model: deploymentName, input: true as any }),
            {
              messagePattern: /'\$\.input' is invalid/,
              type: `invalid_request_error`,
              errorCode: null,
            },
          );
        });

        it("embeddings request with dimensions", async function () {
          const prompt = ["This is text to be embedded"];
          deploymentName = "text-embedding-3-small";
          const embeddings = await client.embeddings.create({
            model: deploymentName,
            input: prompt,
            dimensions: 512,
          });
          assert.isNotNull(embeddings.data);
          assert.equal(embeddings.data.length > 0, true);
          assert.isNotNull(embeddings.data[0].embedding);
          assert.equal(embeddings.data[0].embedding.length, 512);
          assert.isNotNull(embeddings.usage);
        });
      });
    });
  });
});
