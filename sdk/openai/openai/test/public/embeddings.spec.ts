// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/recordedClient.js";
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
      let modelName: string;

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, "completions", { recorder });
        modelName = "text-embedding-ada-002";
      });

      describe("getEmbeddings", function () {
        it("embeddings test", async function () {
          const prompt = ["This is text to be embedded"];
          const embeddings = await client.getEmbeddings(modelName, prompt);
          assert.isNotNull(embeddings.data);
          assert.equal(embeddings.data.length > 0, true);
          assert.isNotNull(embeddings.data[0].embedding);
          assert.equal(embeddings.data[0].embedding.length > 0, true);
          assert.isNotNull(embeddings.usage);
        });

        it("wrong prompt type", async function () {
          const expectations = {
            messagePattern: /'\$.input' is invalid/,
            type: `invalid_request_error`,
          };
          try {
            await client.getEmbeddings(modelName, true as any);
          } catch (e: any) {
            assert.match(e.message, expectations.messagePattern);
            assert.equal(e.type, expectations.type);
          }
        });
      });
    });
  });
});
