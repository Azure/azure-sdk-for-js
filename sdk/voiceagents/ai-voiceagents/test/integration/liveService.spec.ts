// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { TokenCredential } from "@azure/core-auth";
import { VoiceAgentsClient, type VoiceAgentDefinition } from "../../src/index.js";

const preview = "VoiceAgents=V1Preview" as const;

describe("VoiceAgentsClient live service", { skip: !isLiveMode() }, () => {
  it("runs the management REST lifecycle and cleans up", { timeout: 120_000 }, async () => {
    const endpoint = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_ENDPOINT");
    const baseAgentName = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_AGENT_NAME");
    const model = process.env["AZURE_VOICE_AGENTS_MODEL"] ?? "gpt-realtime";
    const agentName = `${baseAgentName.slice(0, 42)}-test-${Date.now()}`;
    const client = new VoiceAgentsClient(endpoint, await createLiveCredential());
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model,
      instructions: "You are a concise and helpful voice assistant.",
      output_modalities: ["text", "audio"],
    };
    let agentCreated = false;

    try {
      const created = await client.voiceAgents.createVoiceAgent(preview, agentName, definition, {
        description: "Temporary Voice Agents JavaScript SDK live test",
      });
      agentCreated = true;
      assert.equal(created.name, agentName);

      const retrieved = await client.voiceAgents.getVoiceAgent(preview, agentName);
      assert.equal(retrieved.name, agentName);

      const updated = await client.voiceAgents.updateVoiceAgent(preview, agentName, {
        ...definition,
        instructions: "You are a concise, friendly, and helpful voice assistant.",
      });
      assert.equal(updated.name, agentName);

      const names: string[] = [];
      for await (const agent of client.voiceAgents.listVoiceAgents(preview, { limit: 100 })) {
        names.push(agent.name);
      }
      assert.ok(names.includes(agentName));
    } finally {
      if (agentCreated) {
        await client.voiceAgents.deleteVoiceAgent(preview, agentName);
      }
    }
  });

  it("retrieves an agent and completes a WebSocket tool turn", { timeout: 90_000 }, async () => {
    const endpoint = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_ENDPOINT");
    const agentName = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_AGENT_NAME");
    const client = new VoiceAgentsClient(endpoint, await createLiveCredential());

    const agent = await client.voiceAgents.getVoiceAgent(preview, agentName);
    assert.equal(agent.name, agentName);

    const connection = await client.streaming.connect(agentName);
    let completed = false;
    let pendingToolOutput = false;
    let timedOut = false;
    let toolCallCount = 0;
    let text = "";
    const timeout = setTimeout(() => {
      timedOut = true;
      void connection.close(1000, "Live test timeout").catch(() => {});
    }, 60_000);

    try {
      await connection.configureSession({
        type: "realtime",
        output_modalities: ["text"],
        tools: [
          {
            type: "function",
            name: "get_weather",
            description: "Get the current weather for a city.",
            parameters: {
              type: "object",
              properties: { city: { type: "string" } },
              required: ["city"],
            },
          },
        ],
      });
      await connection.sendText("What is the weather in Seattle? Use the weather tool.");

      for await (const event of connection) {
        switch (event.type) {
          case "response.output_text.delta":
          case "response.output_audio_transcript.delta":
            text += event.delta;
            break;
          case "response.function_call_arguments.done":
            toolCallCount++;
            pendingToolOutput = true;
            await connection.sendToolOutput(
              event.call_id,
              JSON.stringify({ city: "Seattle", temperature: 62, unit: "F" }),
              { createResponse: false },
            );
            break;
          case "error":
            throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
          case "response.done":
            if (pendingToolOutput) {
              pendingToolOutput = false;
              await connection.requestResponse();
            } else {
              completed = true;
              await connection.close();
            }
            break;
        }
      }

      assert.equal(timedOut, false, "The live WebSocket workflow timed out.");
      assert.equal(completed, true);
      assert.equal(toolCallCount, 1);
      assert.ok(text.length > 0, "Expected streamed text from the final response.");
    } finally {
      clearTimeout(timeout);
      await connection.dispose();
    }
  });
});

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  assert.ok(value, `Missing ${name} environment variable.`);
  return value;
}

async function createLiveCredential(): Promise<TokenCredential> {
  const token = process.env["AZURE_VOICE_AGENTS_TEST_TOKEN"];
  if (token) {
    return {
      getToken: async () => ({ token, expiresOnTimestamp: Date.now() + 300_000 }),
    };
  }

  const testCredentialPackage = "@azure-tools/test-credential";
  const { createTestCredential } = (await import(testCredentialPackage)) as {
    createTestCredential(): TokenCredential;
  };
  return createTestCredential();
}
