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
import { AuthMethod } from "./utils/utils.js";
import { assertImagesWithJSON, assertImagesWithURLs } from "./utils/asserts.js";
import OpenAI, { AzureOpenAI } from "openai";

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

  matrix([["AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, "dalle");
      });

      describe("getImages", function () {
        const imageGenerationDeployments: string[] = [];
        const prompt = "monkey eating banana";
        const numberOfImages = 1;
        const height = 1024;
        const width = 1024;
        const size = `${height}x${width}`;

        it("generates image URLs", async function () {
          updateWithSucceeded(
            await withDeployments(
              getSucceeded(
                deployments,
                imageGenerationDeployments,
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
          );
        });

        it("generates image strings", async function () {
          updateWithSucceeded(
            await withDeployments(
              getSucceeded(
                deployments,
                imageGenerationDeployments,
              ),
              (deploymentName) =>
                client.images.generate({
                  model: deploymentName,
                  prompt,
                  n: numberOfImages,
                  size,
                  response_format: "b64_json",
                }),
              (item) => assertImagesWithJSON(item, height, width),
            ),
            imageGenerationDeployments,
          );
        });
      });
    });
  });
});
