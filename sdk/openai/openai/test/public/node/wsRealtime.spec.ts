// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { describe, beforeEach, it } from "vitest";
import { OpenAIRealtimeWS } from "openai/beta/realtime/ws";
import { APIVersion, withDeployments } from "../../utils/utils.js";
import {
  assertResponseTextDeltaEvent,
  assertResponseTextDoneEvent,
  assertSessionCreatedEvent,
} from "../../utils/asserts.js";
import { createClientsAndDeployments } from "../../utils/createClients.js";
import type { ClientsAndDeploymentsInfo } from "../../utils/types.js";
import type { AzureOpenAI } from "openai";

describe("Realtime", () => {
  matrix([[APIVersion["2024_10_01_preview"]]] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async () => {
        clientAndDeployments = createClientsAndDeployments(apiVersion, { realtime: "true" });
      });

      describe("OpenAIRealtimeWS", function () {
        it("ws.azure", async () => {
          await withDeployments(clientAndDeployments, async (client, deploymentName) => {
            const rt = await OpenAIRealtimeWS.azure(client as AzureOpenAI, { deploymentName });
            await new Promise<void>((resolve, reject) => {
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
              rt.socket.on("close", () => resolve());
            });
          });
        });
      });
    });
  });
});
