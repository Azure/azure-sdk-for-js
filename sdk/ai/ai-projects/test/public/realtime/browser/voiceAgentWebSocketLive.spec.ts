// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it, beforeEach, afterEach } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isRestError } from "@azure/ai-projects";
import type { AIProjectClient, VoiceAgentDefinition } from "../../../../src/index.js";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";

const isLive = isLiveMode();
const modelName = process.env["FOUNDRY_VOICE_AGENT_MODEL"]?.trim() || "gpt-realtime";
const preview = "VoiceAgents=V1Preview" as const;

// Browser-only counterpart to ../node/voiceAgentWebSocketLive.spec.ts. The protocol behavior
// tested there is transport-agnostic, so this file focuses on what is actually browser-specific:
// acquiring an Entra token via the relay credential (createTestCredential() auto-detects the
// browser environment) and completing the WebSocket upgrade via the subprotocol-based bearer
// token (see src/webSocketTransport-browser.mts), since browsers cannot set a custom
// `Authorization` header on the upgrade request.
describe.runIf(isLive)(
  "AIProjectClient Voice Agent realtime streaming from a browser (live)",
  () => {
    let recorder: Recorder;
    let client: AIProjectClient;
    const createdAgents: string[] = [];

    beforeEach(async (context: VitestTestContext) => {
      recorder = await createRecorder(context);
      client = createProjectsClient(recorder);
    });

    afterEach(async () => {
      for (const agentName of createdAgents) {
        await client.agents.delete(agentName).catch(() => undefined);
      }
      createdAgents.length = 0;
      await recorder.stop();
    });

    async function ensureAgentExists(agentName: string, definition: VoiceAgentDefinition) {
      try {
        await client.agents.get(agentName);
      } catch (error) {
        if (!isRestError(error) || error.statusCode !== 404) {
          throw error;
        }
        await client.agents.create(agentName, definition, { foundryFeatures: preview });
        createdAgents.push(agentName);
      }
    }

    it("connects to the realtime endpoint and receives a session confirmation", async () => {
      const agentName = `voice-agent-browser-connect-${Date.now()}`;
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        model_type: "managed",
        model: modelName,
        instructions: "Simple assistant",
        output_modalities: ["text"],
      };

      await ensureAgentExists(agentName, definition);

      const connection = await client.beta.voiceAgents.realtime.connect(agentName);
      let sawSessionEvent = false;

      try {
        for await (const event of connection) {
          if (event.type === "session.created" || event.type === "session.updated") {
            sawSessionEvent = true;
            await connection.close();
            break;
          }
          if (event.type === "error") {
            throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
          }
        }
      } finally {
        await connection.dispose();
      }

      assert.ok(
        sawSessionEvent,
        "expected a session.created/session.updated event over the browser WebSocket transport",
      );
    }, 120_000);

    it("streams text output for a basic conversation", async () => {
      const agentName = `voice-agent-browser-text-${Date.now()}`;
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        model_type: "managed",
        model: modelName,
        instructions: "Respond conversationally without using tools.",
        output_modalities: ["text"],
      };

      await ensureAgentExists(agentName, definition);

      const connection = await client.beta.voiceAgents.realtime.connect(agentName);
      let text = "";

      try {
        await connection.configureSession({
          type: "realtime",
          output_modalities: ["text"],
        });
        await connection.sendText("Tell me a short joke.");

        for await (const event of connection) {
          switch (event.type) {
            case "response.output_text.delta":
              text += event.delta;
              break;
            case "error":
              throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
            case "response.done":
              await connection.close();
              break;
          }
        }
      } finally {
        await connection.dispose();
      }

      assert.ok(text.length > 0, "expected text output over the browser WebSocket transport");
    }, 120_000);
  },
);
