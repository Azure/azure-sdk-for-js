// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it, assert } from "vitest";
import { APIVersion } from "../../utils/utils.js";
import { OpenAIRealtimeWebSocket } from "openai/beta/realtime/websocket";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import {
  assertResponseTextDeltaEvent,
  assertResponseTextDoneEvent,
  assertSessionCreatedEvent,
} from "../../utils/asserts.js";
import type { OpenAI } from "openai";

describe("Realtime", () => {
  matrix([[APIVersion.Realtime]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clients: OpenAI[];

      beforeEach(async function () {
        clients = createClientsAndDeployments(
          apiVersion,
          { realtime: "true" },
          { createClientWithDeployment: true },
        ).clientsAndDeployments[0].clientsWithDeployment!;
      });

      describe("OpenAIRealtimeWebSocket", function () {
        it("rt websocket operations", async function () {
          assert.isAtLeast(clients.length, 1);
          for (const client of clients) {
            const rt = await OpenAIRealtimeWebSocket.azure(client as any);
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
              console.log("Realtime test ran into an error", JSON.stringify(err));
              throw err;
            });

            rt.on("session.created", (event) => {
              assertSessionCreatedEvent(event);
            });

            rt.on("response.text.delta", (event) => {
              console.log(event.delta);
              assertResponseTextDeltaEvent(event);
            });

            rt.on("response.text.done", (event) => {
              console.log(event);
              assertResponseTextDoneEvent(event);
            });

            rt.on("response.done", () => rt.close());
          }
        });
      });
    });
  });
});
