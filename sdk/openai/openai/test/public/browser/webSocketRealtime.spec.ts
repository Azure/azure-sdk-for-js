// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureOpenAI } from "openai";
import { OpenAIRealtimeWebSocket } from "openai/beta/realtime/websocket";
import { assert, describe } from "vitest";
import {
  assertResponseTextDeltaEvent,
  assertResponseTextDoneEvent,
  assertSessionCreatedEvent,
} from "../../utils/asserts.js";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import { APIVersion, testWithDeployments } from "../../utils/utils.js";

describe.for([APIVersion.v2024_10_01_preview])(
  "OpenAIRealtimeWebSocket [%s]",
  (apiVersion: APIVersion) => {
    const clientsAndDeploymentsInfo = createClientsAndDeployments(apiVersion, { realtime: "true" });

    describe("websocket.azure", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        apiVersion,
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
              console.error("[rt.on error]", err);
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
              try {
                assert.isAtLeast(deltaReceived, 2);
                resolve();
              } catch (e) {
                reject(e);
              }
            });
          });
        },
      });
    });
  },
);
