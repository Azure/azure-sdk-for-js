// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, it, beforeAll } from "vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIMatrix, type APIVersion, withDeployments } from "../utils/utils.js";
import { assertEmbeddings } from "../utils/asserts.js";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";

describe("Embeddings", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientsAndDeployments: ClientsAndDeploymentsInfo;

      beforeAll(async function () {
        clientsAndDeployments = createClientsAndDeployments(apiVersion, { embeddings: "true" });
      });

      describe("embeddings.create", function () {
        it("embeddings test", async () => {
          const prompt = ["This is text to be embedded"];
          await withDeployments(
            clientsAndDeployments,
            (client, deploymentName) =>
              client.embeddings.create({ model: deploymentName, input: prompt }),
            assertEmbeddings,
          );
        });

        it("embeddings request with dimensions", async () => {
          const prompt = ["This is text to be embedded"];
          const dimensions = 512;
          await withDeployments(
            clientsAndDeployments,
            (client, deploymentName) =>
              client.embeddings.create({ model: deploymentName, input: prompt, dimensions }),
            (embedding) => assertEmbeddings(embedding, { dimensions }),
            [{ name: "text-embedding-ada-002", version: "2" }],
          );
        });
      });
    });
  });
});
