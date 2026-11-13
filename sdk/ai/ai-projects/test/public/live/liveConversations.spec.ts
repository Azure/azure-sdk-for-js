// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectClient } from "../../../src/index.js";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { delay, isNodeLike, randomUUID } from "@azure/core-util";
import { isRestError } from "@azure/core-rest-pipeline";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { LiveSpeechActivity, runLiveAudioSession } from "./e2eTypes.js";

const preview = "VoiceAgents=V1Preview" as const;

describe("VoiceAgents Live conversations recordings", () => {
  let fixtureClient: AIProjectClient | undefined;
  let fixture:
    | {
        agentName: string;
        conversationId: string;
        secondConversationId: string;
        deletedConversationId: string;
        inputId: string;
        outputId: string;
      }
    | undefined;
  let ownedAgent: string | undefined;
  let recorder: Recorder;
  let client: AIProjectClient;
  let agentName: string;
  let conversationId: string;
  let secondConversationId: string;
  let deletedConversationId: string;
  let inputId: string;
  let outputId: string;

  beforeAll(async () => {
    if (isPlaybackMode()) return;
    // WebSockets cannot be recorded. Browser recording uses stored Node-created sessions.
    if (!isNodeLike) {
      fixture = {
        agentName: assertEnvironmentVariable("FOUNDRY_LIVE_RECORDING_AGENT_NAME"),
        conversationId: assertEnvironmentVariable("FOUNDRY_LIVE_RECORDING_CONVERSATION_ID"),
        secondConversationId: assertEnvironmentVariable(
          "FOUNDRY_LIVE_RECORDING_SECOND_CONVERSATION_ID",
        ),
        deletedConversationId: assertEnvironmentVariable(
          "FOUNDRY_LIVE_RECORDING_DELETE_CONVERSATION_ID",
        ),
        inputId: assertEnvironmentVariable("FOUNDRY_LIVE_RECORDING_INPUT_ITEM_ID"),
        outputId: assertEnvironmentVariable("FOUNDRY_LIVE_RECORDING_OUTPUT_ITEM_ID"),
      };
      return;
    }
    fixtureClient = createProjectsClient();
    ownedAgent = `js-live-recorded-${randomUUID()}`;
    await fixtureClient.agents.create(
      ownedAgent,
      {
        kind: "voice",
        sub_protocol: "live",
        model_type: "self_deployed",
        model: process.env["FOUNDRY_LIVE_MODEL"]?.trim() || "gpt-live-1",
        instructions: "Answer the user's spoken question in one short sentence.",
        audio: { format: { type: "audio/pcm", rate: 24000 } },
        store: true,
      },
      { foundryFeatures: preview, abortSignal: AbortSignal.timeout(30_000) },
    );
    const { readFile } = await import("node:fs/promises");
    const pcm = new Uint8Array(
      await readFile(new URL("../../../samples-dev/agents/assets/input.pcm", import.meta.url)),
    );
    const stored: string[] = [];
    for (let index = 0; index < 3; index++) {
      const connection = await fixtureClient.beta.voiceAgents.live.connect(ownedAgent, {
        store: true,
        abortSignal: AbortSignal.timeout(30_000),
      });
      const speech = new LiveSpeechActivity();
      let id: string | undefined;
      await runLiveAudioSession(
        connection,
        (event) => {
          speech.observe(event);
          if (event.type === "session.started") id = event.conversation_id;
        },
        (signal, sent) => speech.waitForSpeech(signal, sent, 45_000),
        pcm,
      );
      if (!id) throw new Error("Stored Live session did not return a conversation ID.");
      stored.push(id);
    }
    for (let attempt = 0; attempt < 30; attempt++) {
      try {
        const conversation = await fixtureClient.beta.voiceAgents.liveConversations.get(
          ownedAgent,
          stored[0],
        );
        const items = [];
        for await (const item of fixtureClient.beta.voiceAgents.liveConversations.listItems(
          ownedAgent,
          stored[0],
        )) {
          items.push(item);
        }
        const input = items.find((item) => item.type === "input");
        const output = items.find((item) => item.type === "output");
        await fixtureClient.beta.voiceAgents.liveConversations.getAudio(ownedAgent, stored[0]);
        if (conversation.status === "completed" && input && output) {
          fixture = {
            agentName: ownedAgent,
            conversationId: stored[0],
            secondConversationId: stored[1],
            deletedConversationId: stored[2],
            inputId: input.id,
            outputId: output.id,
          };
          return;
        }
      } catch (error) {
        if (!isRestError(error) || ![404, 409].includes(error.statusCode ?? 0)) throw error;
      }
      await delay(1000);
    }
    throw new Error("The stored Live conversation/audio fixture did not finalize.");
  }, 180_000);

  afterAll(async () => {
    if (!fixtureClient || !ownedAgent) return;
    try {
      await fixtureClient.agents.delete(ownedAgent, { abortSignal: AbortSignal.timeout(30_000) });
    } catch (error) {
      if (!isRestError(error) || error.statusCode !== 404) throw error;
    }
  });

  beforeEach(async (context: VitestTestContext) => {
    recorder = await createRecorder(context);
    client = createProjectsClient(recorder);
    if (isPlaybackMode()) {
      agentName = recorder.variable("agentName");
      conversationId = recorder.variable("conversationId");
      secondConversationId = recorder.variable("secondConversationId");
      deletedConversationId = recorder.variable("deletedConversationId");
      inputId = recorder.variable("inputId");
      outputId = recorder.variable("outputId");
    } else {
      if (!fixture) throw new Error("Real stored Live fixtures were not created.");
      agentName = recorder.variable("agentName", fixture.agentName);
      conversationId = recorder.variable("conversationId", fixture.conversationId);
      secondConversationId = recorder.variable(
        "secondConversationId",
        fixture.secondConversationId,
      );
      deletedConversationId = recorder.variable(
        "deletedConversationId",
        fixture.deletedConversationId,
      );
      inputId = recorder.variable("inputId", fixture.inputId);
      outputId = recorder.variable("outputId", fixture.outputId);
    }
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("lists stored Live conversations and resumes a page", async () => {
    const operations = client.beta.voiceAgents.liveConversations;
    const first = await operations.list(agentName, { limit: 1 }).byPage({ maxPageSize: 1 }).next();
    expect(first.done).toBe(false);
    expect(first.value).toHaveLength(1);
    expect(first.value.continuationToken).toBeTruthy();
    const resumed = await operations
      .list(agentName, { limit: 1 })
      .byPage({ continuationToken: first.value.continuationToken, maxPageSize: 1 })
      .next();
    expect(resumed.done).toBe(false);
    expect(resumed.value[0].id).not.toBe(first.value[0].id);
    const ids = [];
    for await (const conversation of operations.list(agentName)) ids.push(conversation.id);
    expect(ids).toEqual(expect.arrayContaining([conversationId, secondConversationId]));
  });

  it("gets a finalized Live conversation", async () => {
    const conversation = await client.beta.voiceAgents.liveConversations.get(
      agentName,
      conversationId,
    );
    expect(conversation).toMatchObject({
      id: conversationId,
      object: "voice.conversation",
      status: "completed",
    });
    expect(conversation.created_at).toBeInstanceOf(Date);
    expect(conversation.completed_at).toBeInstanceOf(Date);
    expect(conversation.last_error).toBeUndefined();
  });

  it("lists Live items and resumes a page", async () => {
    const operations = client.beta.voiceAgents.liveConversations;
    const first = await operations
      .listItems(agentName, conversationId, { limit: 1 })
      .byPage({ maxPageSize: 1 })
      .next();
    expect(first.done).toBe(false);
    expect(first.value).toHaveLength(1);
    expect(first.value.continuationToken).toBeTruthy();
    const resumed = await operations
      .listItems(agentName, conversationId, { limit: 1 })
      .byPage({ continuationToken: first.value.continuationToken, maxPageSize: 1 })
      .next();
    expect(resumed.value[0].id).not.toBe(first.value[0].id);
    const ids = [];
    for await (const item of operations.listItems(agentName, conversationId)) ids.push(item.id);
    expect(ids).toEqual(expect.arrayContaining([inputId, outputId]));
  });

  it("gets captured input and output items", async () => {
    for (const [itemId, type] of [
      [inputId, "input"],
      [outputId, "output"],
    ]) {
      const item = await client.beta.voiceAgents.liveConversations.getItem(
        agentName,
        conversationId,
        itemId,
      );
      expect(item).toMatchObject({ id: itemId, type });
    }
  });

  it("gets merged stereo recording metadata", async () => {
    const audio = await client.beta.voiceAgents.liveConversations.getAudio(
      agentName,
      conversationId,
    );
    expect(audio).toMatchObject({
      conversation_id: conversationId,
      format: "wav",
      sample_rate: 24000,
      channels: 2,
      channel_layout: { left: "user", right: "agent" },
    });
    expect(audio.duration_ms).toBeGreaterThan(0);
  });

  it("downloads the merged stereo recording", async () => {
    const audio = await client.beta.voiceAgents.liveConversations.downloadAudio(
      agentName,
      conversationId,
    );
    await expectWav(audio, 2);
  });

  it("gets input and output audio metadata", async () => {
    for (const itemId of [inputId, outputId]) {
      const audio = await client.beta.voiceAgents.liveConversations.getAudioItem(
        agentName,
        conversationId,
        itemId,
      );
      expect(audio).toMatchObject({
        conversation_id: conversationId,
        item_id: itemId,
        format: "wav",
        codec: "pcm16",
        sample_rate: 24000,
        channels: 1,
      });
      expect(audio.duration_ms).toBeGreaterThan(0);
    }
  });

  it("downloads captured input and output audio", async () => {
    for (const itemId of [inputId, outputId]) {
      const audio = await client.beta.voiceAgents.liveConversations.downloadAudioItem(
        agentName,
        conversationId,
        itemId,
      );
      await expectWav(audio, 1);
    }
  });

  it("deletes a stored Live conversation and its audio", async () => {
    const operations = client.beta.voiceAgents.liveConversations;
    await operations.delete(agentName, deletedConversationId);
    await expect(operations.get(agentName, deletedConversationId)).rejects.toMatchObject({
      statusCode: 404,
    });
    await expect(operations.getAudio(agentName, deletedConversationId)).rejects.toMatchObject({
      statusCode: 404,
    });
  });
});

async function expectWav(
  audio: { blobBody?: Promise<Blob>; readableStreamBody?: NodeJS.ReadableStream },
  channels: number,
): Promise<void> {
  let bytes: Uint8Array;
  if (audio.blobBody) {
    bytes = new Uint8Array(await (await audio.blobBody).arrayBuffer());
  } else {
    if (!audio.readableStreamBody) {
      throw new Error("Audio response did not contain a readable body.");
    }
    const { buffer } = await import("node:stream/consumers");
    bytes = await buffer(audio.readableStreamBody);
  }
  expect(bytes.length).toBeGreaterThan(44);
  expect(String.fromCharCode(...bytes.subarray(0, 4))).toBe("RIFF");
  expect(String.fromCharCode(...bytes.subarray(8, 12))).toBe("WAVE");
  const header = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  expect(header.getUint32(4, true) + 8).toBe(bytes.length);
  expect(header.getUint16(22, true)).toBe(channels);
  expect(header.getUint32(24, true)).toBe(24000);
  expect(header.getUint16(34, true)).toBe(16);
}
