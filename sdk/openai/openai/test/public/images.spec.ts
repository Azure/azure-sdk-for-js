// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils-vitest";
import { createClient } from "./utils/createClient.js";
import {
  APIMatrix,
  APIVersion,
  DeploymentInfo,
  getDeployments,
  getSucceeded,
  updateWithSucceeded,
  withDeployments,
} from "./utils/utils.js";
import { assertImagesWithJSON, assertImagesWithURLs } from "./utils/asserts.js";
import OpenAI, { AzureOpenAI } from "openai";
import { describe, it, beforeAll } from "vitest";
import { imageGenerationModels } from "./utils/models.js";

describe("Images", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let deployments: DeploymentInfo[] = [];
      let client: AzureOpenAI | OpenAI;

      beforeAll(async function () {
        client = createClient(apiVersion, "vision");
        deployments = await getDeployments("vision");
      });

      describe("getImages", function () {
        const imageGenerationDeployments: DeploymentInfo[] = [];
        const prompt = "a flower vase on a table";
        const numberOfImages = 1;
        const height = 1024;
        const width = 1024;
        const size = `${height}x${width}`;

        it("generates image URLs", async function () {
          updateWithSucceeded(
            await withDeployments(
              getSucceeded(deployments, imageGenerationDeployments),
              (deploymentName) =>
                client.images.generate({
                  model: deploymentName,
                  prompt: prompt,
                  n: numberOfImages,
                  size,
                }),
              (item) => assertImagesWithURLs(item, height, width),
              imageGenerationModels,
            ),
            imageGenerationDeployments,
          );
        });

        it("generates image strings", async function () {
          updateWithSucceeded(
            await withDeployments(
              getSucceeded(deployments, imageGenerationDeployments),
              (deploymentName) =>
                client.images.generate({
                  model: deploymentName,
                  prompt,
                  n: numberOfImages,
                  size,
                  response_format: "b64_json",
                }),
              (item) => assertImagesWithJSON(item, height, width),
              imageGenerationModels,
            ),
            imageGenerationDeployments,
          );
        });
      });
    });
  });
});
