// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/createClient.js";
import {
  getDeployments,
  getModels,
  getSucceeded,
  updateWithSucceeded,
  withDeployments,
} from "./utils/utils.js";
import { AuthMethod } from "./utils/types.js";
import OpenAI from "openai";
import { assertImagesWithStrings, assertImagesWithURLs } from "./utils/asserts.js";

describe("Images", function () {
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

  matrix([["OpenAIKey"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: OpenAI;

      beforeEach(async function (this: Context) {
        client = createClient("dalle");
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
                client.images.generate({
                  model: deploymentName,
                  prompt: prompt,
                  n: numberOfImages,
                  size,
                }),
              (item) => assertImagesWithURLs(item, height, width, recorder),
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
                client.images.generate({model: deploymentName, prompt, 
                  n: numberOfImages,
                  size,
                  response_format: "b64_json",
                }),
              (item) => assertImagesWithStrings(item, height, width),
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
