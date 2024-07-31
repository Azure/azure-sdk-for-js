// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils";
import { describe, beforeEach, it } from "vitest";
import { createClient } from "./utils/createClient.js";
import { APIMatrix, APIVersion, getDeployments, withDeployments } from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";
import { assertEmbeddings, assertOpenAiError } from "./utils/asserts.js";

describe("Embeddings", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;
      let deployments: string[] = [];

      beforeEach(async function () {
        client = createClient(apiVersion, "completions");
        if (!deployments.length) {
          deployments = await getDeployments("completions");
        }
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

        it("wrong prompt type", async function () {
          // TODO: Update the error message expectations
          await assertOpenAiError(
            client.embeddings.create({ model: "text-embedding-3-small", input: true as any }),
            {
              messagePattern: /'\$\.input' is invalid/,
              type: `invalid_request_error`,
              errorCode: null,
            },
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
