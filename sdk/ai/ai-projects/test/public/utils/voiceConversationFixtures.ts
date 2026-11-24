// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AIProjectClient,
  RealtimeConversationItemMessageAssistant,
  RealtimeConversationItemMessageUser,
} from "../../../src/index.js";
import { delay } from "@azure/core-util";
import { isRestError } from "@azure/core-rest-pipeline";

export interface VoiceConversationFixtures {
  agentName: string;
  conversationId: string;
  secondConversationId: string;
  deletedConversationId: string;
  inputId: string;
  outputId: string;
  responseId: string;
}

// WebSocket traffic cannot be recorded. Create real stored sessions before starting the recorder.
export async function createVoiceConversationFixtures(
  client: AIProjectClient,
  agentName: string,
): Promise<VoiceConversationFixtures> {
  await client.agents.create(agentName, {
    kind: "voice",
    model_type: "self_deployed",
    model: process.env["FOUNDRY_VOICE_MODEL"] || "gpt-realtime",
    instructions: "Answer in one short sentence.",
    output_modalities: ["audio"],
    audio: {
      input: { turn_detection: null, format: { type: "audio/pcm", rate: 24000 } },
      output: { format: { type: "audio/pcm", rate: 24000 } },
    },
    store: true,
  });
  const { readFile } = await import("node:fs/promises");
  const pcm = await readFile(
    new URL("../../../samples-dev/agents/assets/input.pcm", import.meta.url),
  );
  for (let index = 0; index < 3; index++) {
    const connection = await client.voiceAgents.realtime.connect(agentName, { store: true });
    const timeout = setTimeout(() => void connection.close(), 60_000);
    let responses = 0;
    try {
      await connection.sendAudio(pcm);
      await connection.commitAudio();
      await connection.requestResponse();
      for await (const event of connection) {
        if (event.type === "error") {
          throw new Error(`${event.error.code}: ${event.error.message}`);
        }
        if (event.type === "response.done") {
          if (event.response.status !== "completed") {
            throw new Error(`Fixture response did not complete: ${event.response.status}`);
          }
          if (++responses === 2) break;
          await connection.sendText("Say goodbye briefly.");
        }
      }
      if (responses !== 2) throw new Error("Timed out creating the stored voice conversation.");
    } finally {
      clearTimeout(timeout);
      await connection.dispose();
    }
  }

  const operations = client.voiceAgents.conversations;
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const conversations = [];
      for await (const conversation of operations.list(agentName, { order: "asc" })) {
        conversations.push(conversation);
      }
      if (conversations.length === 3 && conversations.every((c) => c.status === "completed")) {
        const conversationId = conversations[0].id;
        const items = [];
        for await (const item of operations.listItems(agentName, conversationId)) items.push(item);
        const input = items
          .filter(
            (item): item is RealtimeConversationItemMessageUser =>
              item.type === "message" && "role" in item && item.role === "user",
          )
          .find((item) => item.content.some((part) => part.type === "input_audio"));
        const responses = [];
        for await (const response of operations.listResponses(agentName, conversationId)) {
          responses.push(response);
        }
        if (input?.id && responses.length === 2 && responses[0].id) {
          const response = await operations.getResponse(agentName, conversationId, responses[0].id);
          const output = response.output?.find(
            (item): item is RealtimeConversationItemMessageAssistant =>
              item.type === "message" && "role" in item && item.role === "assistant",
          );
          if (output?.id) {
            await operations.getAudio(agentName, conversationId);
            await operations.getAudioItem(agentName, conversationId, input.id);
            await operations.getAudioItem(agentName, conversationId, output.id);
            return {
              agentName,
              conversationId,
              secondConversationId: conversations[1].id,
              deletedConversationId: conversations[2].id,
              inputId: input.id,
              outputId: output.id,
              responseId: responses[0].id,
            };
          }
        }
      }
      if (conversations.some((c) => c.status === "failed")) {
        throw new Error("Voice conversation persistence failed.");
      }
    } catch (error) {
      if (!isRestError(error) || ![404, 409].includes(error.statusCode ?? 0)) throw error;
    }
    await delay(1000);
  }
  throw new Error("The stored voice conversation/audio fixtures did not finalize.");
}
