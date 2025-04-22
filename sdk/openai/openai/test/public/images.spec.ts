// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe } from "vitest";
import { assertImagesWithJSON, assertImagesWithURLs } from "../utils/asserts.js";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIMatrix, type APIVersion, testWithDeployments } from "../utils/utils.js";

describe.concurrent.each(APIMatrix)("Images [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(apiVersion, { imageGenerations: "true" });

  describe("images.generate", () => {
    const prompt = "a flower vase on a table";
    const n = 1;
    const height = 1024;
    const width = 1024;
    const size = `${height}x${width}`;

    describe("generates image URLs", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) =>
          client.images.generate({ model: deploymentName, prompt, n, size }),
        validate: (item) => assertImagesWithURLs(item, height, width),
      });
    });

    describe("generates image strings", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) =>
          client.images.generate({ model: deploymentName, prompt, n, size, response_format: "b64_json" }),
        validate: (item) => assertImagesWithJSON(item, height, width),
      });
    });
  });
});
