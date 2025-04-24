// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe } from "vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIMatrix, APIVersion, testWithDeployments } from "../utils/utils.js";

describe.concurrent.for(APIMatrix)("Text to speech [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(
    apiVersion,
    { audio: "true" },
    { modelsToSkip: [{ name: "whisper" }] },
  );

  describe.skipIf(apiVersion === APIVersion.v2024_10_31)("audio.speech.create", () => {
    describe("returns speech based on text input", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deployment) =>
          client.audio.speech.create({
            model: deployment,
            input: "Hello, it is a great day. How are you doing today? ",
            voice: "shimmer",
          }),
        validate: async (audio) => {
          const buffer = await audio.arrayBuffer();
          assert.isNotNull(buffer);
        },
      });
    });
  });
});
