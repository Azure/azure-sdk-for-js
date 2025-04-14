// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, beforeEach, it } from "vitest";
import { matrix } from "@azure-tools/test-utils-vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIVersion } from "../utils/utils.js";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";

describe("AbortSignal", () => {
  let clientsAndDeployments: ClientsAndDeploymentsInfo;

  matrix([[APIVersion.Stable]] as const, async function (apiVersion: APIVersion) {
    beforeEach(async () => {
      clientsAndDeployments = createClientsAndDeployments(apiVersion, { chatCompletion: "true" });
    });

    // TODO: Fix the tests for client.chat.completions.create
    it("Abort signal test for streaming method", async () => {
      const messages = [
        {
          role: "system",
          content: "You are a helpful assistant. You will talk like a pirate.",
        } as const,
        { role: "user", content: "Can you help me?" } as const,
        {
          role: "assistant",
          content: "Arrrr! Of course, me hearty! What can I do for ye?",
        } as const,
        { role: "user", content: "What's the best way to train a parrot?" } as const,
      ];

      const client = clientsAndDeployments.clientsAndDeployments[0].client;
      const deploymentName =
        clientsAndDeployments.clientsAndDeployments[0].deployments[0].deploymentName;
      try {
        const events = client.beta.chat.completions.stream({
          model: deploymentName,
          messages,
          stream: true,
          max_tokens: 800,
          temperature: 0.7,
          presence_penalty: 0,
          frequency_penalty: 0,
        });
        for await (const event of events) {
          assert.isDefined(event);
          events.abort();
        }
        assert.fail("Expected to abort streaming");
      } catch (error: any) {
        assert.isTrue(error.message.includes("aborted"));
      }
    });
  });
});
