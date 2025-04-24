// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, assert } from "vitest";
import { testWithDeployments, APIMatrix, APIVersion } from "../../utils/utils.js";
import { OpenAIRealtimeWebSocket } from "openai/beta/realtime/websocket";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import {
  assertResponseTextDeltaEvent,
  assertResponseTextDoneEvent,
  assertSessionCreatedEvent,
} from "../../utils/asserts.js";
import type { AzureOpenAI } from "openai";

describe.each(APIMatrix)("Realtime [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(apiVersion, { realtime: "true" });

  describe("OpenAIRealtimeWebSocket", function () {
    testWithDeployments({
      clientsAndDeploymentsInfo,
      run: async (client, deploymentName) => {
        const rt = await OpenAIRealtimeWebSocket.azure(client as AzureOpenAI, {
          deploymentName,
        });
        let deltaReceived = 0;
        await new Promise<void>((resolve, reject) => {
          rt.socket.addEventListener("open", () => {
            rt.send({
              type: "session.update",
              session: {
                modalities: ["text"],
                model: "gpt-4o-realtime-preview",
              },
            });

            rt.send({
              type: "conversation.item.create",
              item: {
                type: "message",
                role: "user",
                content: [{ type: "input_text", text: "Say a couple paragraphs!" }],
              },
            });

            rt.send({ type: "response.create" });
          });

          rt.on("error", (err) => {
            reject(err);
          });

          rt.on("session.created", (event) => {
            assertSessionCreatedEvent(event);
          });

          rt.on("response.text.delta", (event) => {
            ++deltaReceived;
            assertResponseTextDeltaEvent(event);
          });

          rt.on("response.text.done", (event) => {
            assertResponseTextDoneEvent(event);
          });

          rt.on("response.done", () => rt.close());

          rt.socket.addEventListener("close", () => {
            assert.isAtLeast(deltaReceived, 2);
            resolve();
          });
        });
      },
    });
  });
});
