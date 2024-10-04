// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, beforeAll } from "vitest";
import { createClient } from "./utils/createClient.js";
import {
  AnyApiVersion,
  APIMatrix,
  DeploymentInfo,
  getDeployments,
  withDeployments,
} from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";
import { assertEmbeddings } from "./utils/asserts.js";

describe("Embeddings", function () {
  matrix([APIMatrix], async function (apiVersion: AnyApiVersion) {
    describe(`[${apiVersion.name}] Client`, () => {
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
            { validate: assertEmbeddings },
          );
        });

        it("embeddings request with dimensions", async function () {
          const prompt = ["This is text to be embedded"];
          const dimensions = 512;
          await withDeployments(
            deployments,
            (deploymentName) =>
              client.embeddings.create({ model: deploymentName, input: prompt, dimensions }),
            { validate: (embedding) => assertEmbeddings(embedding, { dimensions }) },
          );
        });
      });
    });
  });
});
