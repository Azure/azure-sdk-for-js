// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe } from "vitest";
import { assertImagesWithJSON, assertImagesWithURLs } from "../utils/asserts.js";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIMatrix, type APIVersion, testWithDeployments } from "../utils/utils.js";

describe.concurrent.each(APIMatrix)("Images [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(apiVersion, {
    imageGenerations: "true",
  });

  describe("images.generate", () => {
    const prompt = "a flower vase on a table";
    const n = 1;
    const height = 1024;
    const width = 1024;
    const size = `${height}x${width}`;

    describe("generates image URLs", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: (client, deploymentName) =>
          client.images.generate({ model: deploymentName, prompt, n, size }),
        validate: (item) => assertImagesWithURLs(item, height, width),
        modelsListToSkip: [
          { name: "gpt-image-1" }, // always responds with b64_json
        ],
      });
    });

    describe("generates image strings with response_format", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: (client, deploymentName) =>
          client.images.generate({
            model: deploymentName,
            prompt,
            n,
            size,
            response_format: "b64_json",
          }),
        modelsListToSkip: [
          { name: "gpt-image-1" }, // `response_format` parameter is not supported for this model
        ],
        validate: (item) => assertImagesWithJSON(item, height, width),
      });
    });

    describe("generates image strings without response_format", () => {
      testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
        run: (client, deploymentName) =>
          client.images.generate({
            model: deploymentName,
            prompt,
            n,
            size,
            quality: "medium",
          }),
        validate: (item) => assertImagesWithJSON(item, height, width),
        modelsListToSkip: [
          { name: "dall-e-3" }, // quality values are different for dalle3 and gpt-image-1
        ],
      });
    });
  });
});
