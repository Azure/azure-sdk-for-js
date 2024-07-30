// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils";
import { createClient } from "./utils/createClient.js";
import {
  APIMatrix,
  APIVersion,
  getDeployments,
  getSucceeded,
  updateWithSucceeded,
  withDeployments,
} from "./utils/utils.js";
import { assertImagesWithJSON, assertImagesWithURLs } from "./utils/asserts.js";
import OpenAI, { AzureOpenAI } from "openai";
import { describe, beforeEach, it } from "vitest";

describe("Images", function () {
  let deployments: string[] = [];

  beforeEach(async function () {
    if (!deployments.length) {
      deployments = await getDeployments("dalle");
    }
  });

  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function () {
        client = createClient(apiVersion, "dalle");
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
              getSucceeded(deployments, imageGenerationDeployments),
              (deploymentName) =>
                client.images.generate({
                  model: deploymentName,
                  prompt: prompt,
                  n: numberOfImages,
                  size,
                }),
              (item) => assertImagesWithURLs(item, height, width),
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
            ),
            imageGenerationDeployments,
          );
        });
      });
    });
  });
});
