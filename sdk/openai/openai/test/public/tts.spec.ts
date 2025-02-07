// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it, assert } from "vitest";
import { createClient } from "../utils/createClient.js";
import { APIVersion, withDeployments } from "../utils/utils.js";
import { ttsModelsToSkip } from "../utils/models.js";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";

describe("Text to speech", function () {
  matrix([[APIVersion.Preview]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientsAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async function () {
        clientsAndDeployments = createClient(apiVersion, { audio: "true" });
      });

      describe("audio.speech.create", function () {
        it("returns speech based on text input", async function () {
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
            // Skip Whisper model for text to speech test because of server unexpected response error
            ttsModelsToSkip,
          );
        });
      });
    });
  });
});
