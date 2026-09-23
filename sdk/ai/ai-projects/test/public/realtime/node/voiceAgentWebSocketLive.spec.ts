// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it, beforeEach, afterEach } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isRestError } from "@azure/ai-projects";
import type {
  AIProjectClient,
  RealtimeAudioFormatsUnion,
  VoiceAgentDefinition,
  VoiceAgentFunctionTool,
  VoiceAgentServerVadTurnDetection,
} from "../../../../src/index.js";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { createReadStream } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const isLive = isLiveMode();
const modelName = process.env["FOUNDRY_VOICE_AGENT_MODEL"]?.trim() || "gpt-realtime";
const preview = "VoiceAgents=V1Preview" as const;
// get/delete have no `foundryFeatures` shorthand, so the preview opt-in required to read or
// remove a persisted voice agent must be passed as a raw header.
const previewRequestOptions = { requestOptions: { headers: { "foundry-features": preview } } };
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pcmSampleRate = 24_000;
const pcmBytesPerSample = 2;
const audioInputPath = path.join(__dirname, "../data/input.pcm");

function delay(durationInMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationInMs));
}

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
      await client.agents.delete(agentName, previewRequestOptions).catch(() => undefined);
    }
    createdAgents.length = 0;
    await recorder.stop();
  });

  async function ensureAgentExists(agentName: string, definition: VoiceAgentDefinition) {
    try {
      await client.agents.get(agentName, previewRequestOptions);
    } catch (error) {
      if (!isRestError(error) || error.statusCode !== 404) {
        throw error;
      }
      await client.agents.create(agentName, definition, { foundryFeatures: preview });
      createdAgents.push(agentName);
    }
  }

  it("streams text output and handles tool calls", async () => {
    const agentName = `voice-agent-streaming-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "You are a helpful voice assistant. Use tools when appropriate.",
      output_modalities: ["text"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);
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
  }, 120_000);

  it("handles multiple tool calls in sequence", async () => {
    const agentName = `voice-agent-multi-tools-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Use tools to get information when asked. Always use the appropriate tool.",
      output_modalities: ["text"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);
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
  }, 120_000);

  it("handles basic text streaming without tools", async () => {
    const agentName = `voice-agent-text-only-${Date.now()}`;
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
  }, 120_000);

  it("closes connection gracefully", async () => {
    const agentName = `voice-agent-close-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Simple assistant",
      output_modalities: ["text"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);

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
  }, 120_000);

  it("handles session reconfiguration", async () => {
    const agentName = `voice-agent-reconfig-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Flexible assistant",
      output_modalities: ["text"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);

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
  }, 120_000);

  it("streams audio input and output", async () => {
    const agentName = `voice-agent-audio-streaming-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Listen carefully and answer the user's request.",
      output_modalities: ["text", "audio"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);
    let inputAudioByteCount = 0;
    let outputAudioByteCount = 0;
    let inputComplete = false;
    let responseComplete = false;

    try {
      const pcmFormat: RealtimeAudioFormatsUnion = { type: "audio/pcm", rate: pcmSampleRate };
      await connection.configureSession({
        type: "realtime",
        output_modalities: ["text", "audio"],
        audio: {
          input: { format: pcmFormat },
          output: { format: pcmFormat },
        },
      });

      const consumeEvents = (async () => {
        for await (const event of connection) {
          switch (event.type) {
            case "response.output_audio.delta":
              outputAudioByteCount += event.delta.byteLength;
              break;
            case "error":
              throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
            case "response.done":
              // The response can finish before all input has been sent; only close once both
              // sides have finished, matching agentVoiceRealtimeAudio.ts's synchronization.
              responseComplete = true;
              if (inputComplete) {
                await connection.close();
              }
              break;
          }
        }
      })();

      // Pace the input in real time and follow it with trailing silence so server-side turn
      // detection can observe speech boundaries, matching agentVoiceRealtimeAudio.ts's approach.
      const chunkDurationInMs = 100;
      const chunkSize = (pcmSampleRate * pcmBytesPerSample * chunkDurationInMs) / 1000;
      for await (const chunk of createReadStream(audioInputPath, { highWaterMark: chunkSize })) {
        await connection.sendAudio(chunk);
        inputAudioByteCount += chunk.byteLength;
        await delay((chunk.byteLength / (pcmSampleRate * pcmBytesPerSample)) * 1000);
      }
      const silence = new Uint8Array(chunkSize);
      for (let elapsedMs = 0; elapsedMs < 1_000; elapsedMs += chunkDurationInMs) {
        await connection.sendAudio(silence);
        inputAudioByteCount += silence.byteLength;
        await delay(chunkDurationInMs);
      }
      inputComplete = true;
      if (responseComplete) {
        await connection.close();
      }

      await consumeEvents;
    } finally {
      await connection.dispose();
    }

    assert.ok(responseComplete, "expected the response to complete");
    assert.isAbove(inputAudioByteCount, 0, "expected input audio to be sent");
    assert.isAbove(outputAudioByteCount, 0, "expected audio output to be streamed");
  }, 120_000);

  it("configures turn detection settings", async () => {
    const agentName = `voice-agent-turn-detection-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Simple assistant",
      output_modalities: ["text"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);
    let updatedThreshold: number | undefined;
    let updatedSilenceDurationMs: number | undefined;
    let sessionUpdatedCount = 0;

    try {
      await connection.configureSession({
        type: "realtime",
        output_modalities: ["text"],
        audio: {
          input: {
            turn_detection: {
              type: "server_vad",
              threshold: 0.6,
              silence_duration_ms: 400,
              create_response: true,
            },
          },
        },
      });

      for await (const event of connection) {
        if (event.type === "session.updated") {
          sessionUpdatedCount++;
          // The service also emits a session.updated event right after connect (reflecting its
          // own defaults) before the one that reflects this test's configureSession call.
          if (sessionUpdatedCount < 2) {
            continue;
          }
          const turnDetection = event.session.audio?.input?.turn_detection;
          // Same fallback-narrowing limitation documented in src/realtime/protocol.ts's
          // serializeTurnDetection: the generated union's fallback member widens `type` to the
          // full literal union, so an explicit cast reflects the switch's real narrowing.
          if (turnDetection?.type === "server_vad") {
            const serverVad = turnDetection as VoiceAgentServerVadTurnDetection;
            updatedThreshold = serverVad.threshold;
            updatedSilenceDurationMs = serverVad.silence_duration_ms;
          }
          await connection.close();
          break;
        }
      }
    } finally {
      await connection.dispose();
    }

    assert.approximately(updatedThreshold ?? 0, 0.6, 0.001);
    assert.equal(updatedSilenceDurationMs, 400);
  }, 120_000);

  it("cancels an in-progress response", async () => {
    const agentName = `voice-agent-cancel-response-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Tell long, detailed stories when asked.",
      output_modalities: ["text"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);
    let sawTextDelta = false;
    let responseStatus: string | undefined;

    try {
      await connection.configureSession({ type: "realtime", output_modalities: ["text"] });
      await connection.sendText(
        "Tell me a very long, detailed three-paragraph story about a journey.",
      );

      for await (const event of connection) {
        switch (event.type) {
          case "response.output_text.delta":
            if (!sawTextDelta) {
              sawTextDelta = true;
              await connection.cancelResponse();
            }
            break;
          case "error":
            throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
          case "response.done":
            responseStatus = event.response.status;
            await connection.close();
            break;
        }
      }
    } finally {
      await connection.dispose();
    }

    assert.ok(sawTextDelta, "expected at least one text delta before cancelling");
    assert.equal(responseStatus, "cancelled");
  }, 120_000);

  it("rejects clearing the output audio buffer without avatar mode configured", async () => {
    const agentName = `voice-agent-clear-output-rejection-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Answer with a few descriptive sentences.",
      output_modalities: ["audio"],
    };

    await ensureAgentExists(agentName, definition);

    const connection = await client.beta.voiceAgents.realtime.connect(agentName);
    let errorCode: string | undefined;

    try {
      const pcmFormat: RealtimeAudioFormatsUnion = { type: "audio/pcm", rate: pcmSampleRate };
      await connection.configureSession({
        type: "realtime",
        output_modalities: ["audio"],
        audio: { output: { format: pcmFormat } },
      });

      // clearOutputAudio() only sends the client event; the service validates and reports
      // rejection asynchronously as an "error" server event, not a rejected promise.
      await connection.clearOutputAudio();

      for await (const event of connection) {
        if (event.type === "error") {
          errorCode = event.error.code;
          await connection.close();
          break;
        }
      }
    } finally {
      await connection.dispose();
    }

    // Voice Agents (unlike the raw Realtime API) only supports output-buffer barge-in when the
    // session is configured for avatar mode; this documents that real service constraint.
    assert.equal(errorCode, "avatar_not_configured");
  }, 120_000);
});
