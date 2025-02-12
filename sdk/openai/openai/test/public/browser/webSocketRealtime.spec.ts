// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it } from "vitest";
import { APIVersion, withDeployments } from "../../utils/utils.js";
import { OpenAIRealtimeWebSocket } from "openai/beta/realtime/websocket";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import {
  assertResponseTextDeltaEvent,
  assertResponseTextDoneEvent,
  assertSessionCreatedEvent,
} from "../../utils/asserts.js";
import type { ClientsAndDeploymentsInfo } from "../../utils/types.js";

describe("Realtime", () => {
  matrix([[APIVersion.Realtime]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async function () {
        clientAndDeployments = createClientsAndDeployments(apiVersion, { realtime: "true" });
      });

      describe("OpenAIRealtimeWebSocket", function () {
        it("websocket.azure", async function () {
          await withDeployments(clientAndDeployments, async (client, deploymentName) => {
            const rt = await OpenAIRealtimeWebSocket.azure(client as any, { deploymentName });
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
                assertResponseTextDeltaEvent(event);
              });

              rt.on("response.text.done", (event) => {
                assertResponseTextDoneEvent(event);
              });

              rt.on("response.done", () => rt.close());

              rt.socket.addEventListener("close", () => resolve());
            });
          });
        });
      });
    });
  });
});
