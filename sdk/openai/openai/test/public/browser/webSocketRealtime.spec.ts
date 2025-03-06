// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it, assert } from "vitest";
import { APIVersion, withDeployments } from "../../utils/utils.js";
import { OpenAIRealtimeWebSocket } from "openai/beta/realtime/websocket";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import {
  assertResponseTextDeltaEvent,
  assertResponseTextDoneEvent,
  assertSessionCreatedEvent,
} from "../../utils/asserts.js";
import type { ClientsAndDeploymentsInfo } from "../../utils/types.js";
import type { AzureOpenAI } from "openai";

describe("Realtime", () => {
  matrix([[APIVersion["2024_10_01_preview"]]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async () => {
        clientAndDeployments = createClientsAndDeployments(apiVersion, { realtime: "true" });
      });

      describe("OpenAIRealtimeWebSocket", function () {
        it("websocket.azure", async () => {
          await withDeployments(clientAndDeployments, async (client, deploymentName) => {
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
          });
        });
      });
    });
  });
});
