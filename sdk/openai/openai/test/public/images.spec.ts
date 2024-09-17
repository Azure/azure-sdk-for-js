// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/recordedClient.js";
import {
  assertImageGenerationsWithString,
  assertImageGenerationsWithURLs,
} from "./utils/asserts.js";
import {
  getDeployments,
  getModels,
  getSucceeded,
  updateWithSucceeded,
  withDeployments,
} from "./utils/utils.js";
import { OpenAIClient } from "../../src/index.js";
import { AuthMethod } from "./types.js";

describe("OpenAI", function () {
  let recorder: Recorder;
  let deployments: string[] = [];
  let models: string[] = [];

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this.currentTest);
    if (!deployments.length || !models.length) {
      deployments = await getDeployments("dalle", recorder);
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
        client = createClient(authMethod, "dalle", { recorder });
      });

      describe("getImages", function () {
        const imageGenerationDeployments: string[] = [];
        const imageGenerationModels: string[] = [];
        const prompt = "monkey eating banana";
        const numberOfImages = 1;
        const height = 1024;
        const width = 1024;
        const size = `${height}x${width}`;

        it("generates image URLs", async function () {
          updateWithSucceeded(
            await withDeployments(
              getSucceeded(
                authMethod,
                deployments,
                models,
                imageGenerationDeployments,
                imageGenerationModels,
              ),
              (deploymentName) =>
                client.getImages(deploymentName, prompt, {
                  n: numberOfImages,
                  size,
                }),
              (item) => assertImageGenerationsWithURLs(item, recorder, height, width),
            ),
            imageGenerationDeployments,
            imageGenerationModels,
            authMethod,
          );
        });

        it("generates image strings", async function () {
          updateWithSucceeded(
            await withDeployments(
              getSucceeded(
                authMethod,
                deployments,
                models,
                imageGenerationDeployments,
                imageGenerationModels,
              ),
              (deploymentName) =>
                client.getImages(deploymentName, prompt, {
                  n: numberOfImages,
                  size,
                  responseFormat: "b64_json",
                }),
              (item) => assertImageGenerationsWithString(item, height, width),
            ),
            imageGenerationDeployments,
            imageGenerationModels,
            authMethod,
          );
        });
      });
    });
  });
});
