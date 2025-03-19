// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIMatrix, type APIVersion, withDeployments } from "../utils/utils.js";
import { assertImagesWithJSON, assertImagesWithURLs } from "../utils/asserts.js";
import { describe, it, beforeAll } from "vitest";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";

describe("Images", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientsAndDeployments: ClientsAndDeploymentsInfo;

      beforeAll(async function () {
        clientsAndDeployments = createClientsAndDeployments(apiVersion, {
          imageGenerations: "true",
        });
      });

      describe("images.generate", function () {
        const prompt = "a flower vase on a table";
        const n = 1;
        const height = 1024;
        const width = 1024;
        const size = `${height}x${width}`;

        it("generates image URLs", async () => {
          await withDeployments(
            clientsAndDeployments,
            (client, deploymentName) =>
              client.images.generate({
                model: deploymentName,
                prompt,
                n,
                size,
              }),
            (item) => assertImagesWithURLs(item, height, width),
          );
        });

        it("generates image strings", async () => {
          await withDeployments(
            clientsAndDeployments,
            (client, deploymentName) =>
              client.images.generate({
                model: deploymentName,
                prompt,
                n,
                size,
                response_format: "b64_json",
              }),
            (item) => assertImagesWithJSON(item, height, width),
          );
        });
      });
    });
  });
});
