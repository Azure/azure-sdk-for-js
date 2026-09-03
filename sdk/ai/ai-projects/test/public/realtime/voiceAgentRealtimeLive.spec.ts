// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it, beforeEach, afterEach } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import {
  isRestError,
  type AIProjectClient,
  type VoiceAgentDefinition,
  type VoiceAgentFunctionTool,
} from "@azure/ai-projects";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";

const isLive = isLiveMode();
const modelName = process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime";
const preview = "VoiceAgents=V1Preview" as const;

describe.runIf(isLive)("AIProjectClient Voice Agent realtime streaming (live)", () => {
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

  it(
    "streams text output and handles tool calls",
    async () => {
      const agentName = `voice-agent-streaming-${Date.now()}`;
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        model_type: "managed",
        model: modelName,
        instructions: "You are a helpful voice assistant. Use tools when appropriate.",
        output_modalities: ["text"],
      };

      await ensureAgentExists(agentName, definition);

      const connection = await client.realtime.connect(agentName);
      let text = "";
      let toolCalls = 0;
      let pendingToolOutputs = 0;
      const weatherTool: VoiceAgentFunctionTool = {
        type: "function",
        name: "get_weather",
        description: "Get the current weather for a city.",
        parameters: {
          type: "object",
          properties: { city: { type: "string" } },
          required: ["city"],
        },
      };

      try {
        await connection.configureSession({
          type: "realtime",
          output_modalities: ["text"],
          tools: [weatherTool],
        });
        await connection.sendText("What is the weather in Seattle? Use the weather tool.");

        for await (const event of connection) {
          switch (event.type) {
            case "response.output_text.delta":
              text += event.delta;
              break;
            case "response.function_call_arguments.done":
              toolCalls++;
              pendingToolOutputs++;
              await connection.sendToolOutput(
                event.call_id,
                JSON.stringify({ city: "Seattle", temperature: 62, unit: "F" }),
                { createResponse: false },
              );
              break;
            case "error":
              throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
            case "response.done":
              if (pendingToolOutputs > 0) {
                pendingToolOutputs = 0;
                await connection.requestResponse();
              } else {
                await connection.close();
              }
              break;
          }
        }
      } finally {
        await connection.dispose();
      }

      assert.ok(text.length > 0, "expected streamed text output");
      assert.equal(toolCalls, 1);
    },
    120_000,
  );

  it(
    "handles multiple tool calls in sequence",
    async () => {
      const agentName = `voice-agent-multi-tools-${Date.now()}`;
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        model_type: "managed",
        model: modelName,
        instructions: "Use tools to get information when asked. Always use the appropriate tool.",
        output_modalities: ["text"],
      };

      await ensureAgentExists(agentName, definition);

      const connection = await client.realtime.connect(agentName);
      let toolCalls = 0;
      let pendingToolOutputs = 0;

      const tools: VoiceAgentFunctionTool[] = [
        {
          type: "function",
          name: "get_weather",
          description: "Get weather information",
          parameters: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"],
          },
        },
        {
          type: "function",
          name: "get_time",
          description: "Get current time",
          parameters: {
            type: "object",
            properties: { timezone: { type: "string" } },
            required: ["timezone"],
          },
        },
      ];

      try {
        await connection.configureSession({
          type: "realtime",
          output_modalities: ["text"],
          tools,
        });

        // Request multiple tools to be used
        await connection.sendText(
          "What is the weather in New York and the time in Pacific timezone?",
        );

        for await (const event of connection) {
          switch (event.type) {
            case "response.function_call_arguments.done":
              toolCalls++;
              pendingToolOutputs++;
              // Respond to tool call
              if (event.name === "get_weather") {
                await connection.sendToolOutput(
                  event.call_id,
                  JSON.stringify({ city: "New York", temperature: 72, unit: "F" }),
                  { createResponse: false },
                );
              } else if (event.name === "get_time") {
                await connection.sendToolOutput(
                  event.call_id,
                  JSON.stringify({ timezone: "PT", time: "2:30 PM" }),
                  { createResponse: false },
                );
              }
              break;
            case "error":
              throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
            case "response.done":
              if (pendingToolOutputs > 0) {
                pendingToolOutputs = 0;
                await connection.requestResponse();
              } else {
                await connection.close();
              }
              break;
          }
        }
      } finally {
        await connection.dispose();
      }

      assert.ok(toolCalls >= 1, "expected at least one tool call");
    },
    120_000,
  );

  it(
    "handles basic text streaming without tools",
    async () => {
      const agentName = `voice-agent-text-only-${Date.now()}`;
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        model_type: "managed",
        model: modelName,
        instructions: "Respond conversationally without using tools.",
        output_modalities: ["text"],
      };

      await ensureAgentExists(agentName, definition);

      const connection = await client.realtime.connect(agentName);
      let text = "";
      let textDeltaCount = 0;

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
              textDeltaCount++;
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

      assert.ok(text.length > 0, "expected text output");
      assert.ok(textDeltaCount > 0, "expected multiple text deltas");
    },
    120_000,
  );

  it(
    "closes connection gracefully",
    async () => {
      const agentName = `voice-agent-close-${Date.now()}`;
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        model_type: "managed",
        model: modelName,
        instructions: "Simple assistant",
        output_modalities: ["text"],
      };

      await ensureAgentExists(agentName, definition);

      const connection = await client.realtime.connect(agentName);

      try {
        await connection.configureSession({
          type: "realtime",
          output_modalities: ["text"],
        });
        await connection.sendText("Hello");

        // Wait for a response and then close
        let responseReceived = false;
        for await (const event of connection) {
          if (event.type === "response.done") {
            responseReceived = true;
            break;
          }
        }

        assert.ok(responseReceived, "expected response.done event");
      } finally {
        await connection.dispose();
      }
    },
    120_000,
  );

  it(
    "handles session reconfiguration",
    async () => {
      const agentName = `voice-agent-reconfig-${Date.now()}`;
      const definition: VoiceAgentDefinition = {
        kind: "voice",
        model_type: "managed",
        model: modelName,
        instructions: "Flexible assistant",
        output_modalities: ["text"],
      };

      await ensureAgentExists(agentName, definition);

      const connection = await client.realtime.connect(agentName);

      try {
        // Initial configuration
        await connection.configureSession({
          type: "realtime",
          output_modalities: ["text"],
        });

        let responseCount = 0;

        // Send first message
        await connection.sendText("First message");

        for await (const event of connection) {
          if (event.type === "response.done") {
            responseCount++;
            if (responseCount === 1) {
              // Reconfigure session
              await connection.configureSession({
                type: "realtime",
                output_modalities: ["text"],
              });
              await connection.sendText("Second message after reconfiguration");
            } else if (responseCount === 2) {
              // Done with both messages
              await connection.close();
              break;
            }
          }
        }

        assert.equal(responseCount, 2, "expected two responses");
      } finally {
        await connection.dispose();
      }
    },
    120_000,
  );
});
