// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it, assert } from "vitest";
import { OpenAIRealtimeWS } from "openai/beta/realtime/ws";
import { APIVersion } from "../../utils/utils.js";
import {
  assertResponseTextDeltaEvent,
  assertResponseTextDoneEvent,
  assertSessionCreatedEvent,
} from "../../utils/asserts.js";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import OpenAI from "openai";

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

      describe("OpenAIRealtimeWS", function () {
        it("ws.azure", async function () {
          assert.isAtLeast(clients.length, 1);
          for (const client of clients) {
            const rt = await OpenAIRealtimeWS.azure(client as any);
            // access the underlying `ws.WebSocket` instance
            rt.socket.on("open", () => {
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
                  content: [{ type: "input_text", text: "Cite a famous poem!" }],
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
              assertResponseTextDeltaEvent(event);
            });

            rt.on("response.text.done", (event) => {
              assertResponseTextDoneEvent(event);
            });

            rt.on("response.done", () => rt.close());
          }
        });
      });
    });
  });
});
