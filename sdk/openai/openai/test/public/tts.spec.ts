// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it, assert } from "vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIVersion, withDeployments } from "../utils/utils.js";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";

describe("Text to speech", function () {
  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientsAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async () => {
        clientsAndDeployments = createClientsAndDeployments(
          apiVersion,
          { audio: "true" },
          { modelsToSkip: [{ name: "whisper" }] },
        );
      });

      describe("audio.speech.create", function () {
        it("returns speech based on text input", async () => {
          await withDeployments(
            clientsAndDeployments,
            (client, deployment) =>
              client.audio.speech.create({
                model: deployment,
                input: "Hello, it is a great day. How are you doing today? ",
                voice: "shimmer",
              }),
            async (audio) => {
              const buffer = await audio.arrayBuffer();
              assert.isNotNull(buffer);
            },
          );
        });
      });
    });
  });
});
