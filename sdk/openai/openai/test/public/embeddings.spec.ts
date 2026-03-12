// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe } from "vitest";
import { assertEmbeddings } from "../utils/asserts.js";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIMatrix, type APIVersion, testWithDeployments } from "../utils/utils.js";

describe.concurrent.each(APIMatrix)("Embeddings [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(apiVersion, { embeddings: "true" });

  describe("embeddings.create", () => {
    describe("embeddings test", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: (client, deploymentName) =>
          client.embeddings.create({
            model: deploymentName,
            input: ["This is text to be embedded"],
          }),
        validate: assertEmbeddings,
      });
    });

    describe("embeddings request with dimensions", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: (client, deploymentName) =>
          client.embeddings.create({
            model: deploymentName,
            input: ["This is text to be embedded"],
            dimensions: 512,
          }),
        validate: (embedding) => assertEmbeddings(embedding, { dimensions: 512 }),
        modelsListToSkip: [{ name: "text-embedding-ada-002", version: "2" }],
      });
    });
  });
});
