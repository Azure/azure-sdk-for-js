// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, beforeAll } from "vitest";
import { createClient } from "./utils/createClient.js";
import {
  APIMatrix,
  type APIVersion,
  type DeploymentInfo,
  getDeployments,
  withDeployments,
} from "./utils/utils.js";
import type { OpenAI, AzureOpenAI } from "openai";
import { assertEmbeddings } from "./utils/asserts.js";

describe("Embeddings", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      let deployments: DeploymentInfo[] = [];

      beforeAll(async function () {
        client = createClient(apiVersion, "completions");
        deployments = await getDeployments("completions");
      });

      describe("getEmbeddings", function () {
        it("embeddings test", async function () {
          const prompt = ["This is text to be embedded"];
          await withDeployments(
            deployments,
            (deploymentName) => client.embeddings.create({ model: deploymentName, input: prompt }),
            assertEmbeddings,
          );
        });

        it("embeddings request with dimensions", async function () {
          const prompt = ["This is text to be embedded"];
          const dimensions = 512;
          await withDeployments(
            deployments,
            (deploymentName) =>
              client.embeddings.create({ model: deploymentName, input: prompt, dimensions }),
            (embedding) => assertEmbeddings(embedding, { dimensions }),
          );
        });
      });
    });
  });
});
