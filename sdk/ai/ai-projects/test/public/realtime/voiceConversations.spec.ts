// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectClient } from "../../../src/index.js";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { isNodeLike, randomUUID } from "@azure/core-util";
import { isRestError } from "@azure/core-rest-pipeline";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { expectWav } from "../utils/voiceAudio.js";
import type { VoiceConversationFixtures } from "../utils/voiceConversationFixtures.js";
import { createVoiceConversationFixtures } from "../utils/voiceConversationFixtures.js";

describe("VoiceAgents conversations recordings", () => {
  let fixtureClient: AIProjectClient | undefined;
  let ownedAgent: string | undefined;
  let fixture: VoiceConversationFixtures;
  let recorder: Recorder;
  let client: AIProjectClient;
  let recorded: VoiceConversationFixtures;

  beforeAll(async () => {
    if (isPlaybackMode()) return;
    if (!isNodeLike) {
      fixture = {
        agentName: assertEnvironmentVariable("FOUNDRY_VOICE_RECORDING_AGENT_NAME"),
        conversationId: assertEnvironmentVariable("FOUNDRY_VOICE_RECORDING_CONVERSATION_ID"),
        secondConversationId: assertEnvironmentVariable(
          "FOUNDRY_VOICE_RECORDING_SECOND_CONVERSATION_ID",
        ),
        deletedConversationId: assertEnvironmentVariable(
          "FOUNDRY_VOICE_RECORDING_DELETE_CONVERSATION_ID",
        ),
        inputId: assertEnvironmentVariable("FOUNDRY_VOICE_RECORDING_INPUT_ITEM_ID"),
        outputId: assertEnvironmentVariable("FOUNDRY_VOICE_RECORDING_OUTPUT_ITEM_ID"),
        responseId: assertEnvironmentVariable("FOUNDRY_VOICE_RECORDING_RESPONSE_ID"),
      };
      return;
    }
    await import("dotenv/config");
    fixtureClient = createProjectsClient();
    ownedAgent = `js-voice-recorded-${randomUUID()}`;
    fixture = await createVoiceConversationFixtures(fixtureClient, ownedAgent);
  }, 300_000);

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
    recorded = {
      agentName: recorder.variable("agentName", fixture?.agentName),
      conversationId: recorder.variable("conversationId", fixture?.conversationId),
      secondConversationId: recorder.variable(
        "secondConversationId",
        fixture?.secondConversationId,
      ),
      deletedConversationId: recorder.variable(
        "deletedConversationId",
        fixture?.deletedConversationId,
      ),
      inputId: recorder.variable("inputId", fixture?.inputId),
      outputId: recorder.variable("outputId", fixture?.outputId),
      responseId: recorder.variable("responseId", fixture?.responseId),
    };
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("lists stored conversations and resumes a page", async () => {
    const operations = client.voiceAgents.conversations;
    const first = await operations.list(recorded.agentName, { limit: 1 }).byPage().next();
    expect(first.done).toBe(false);
    expect(first.value).toHaveLength(1);
    expect(first.value.continuationToken).toBeTruthy();
    const resumed = await operations
      .list(recorded.agentName, { limit: 1 })
      .byPage({
        continuationToken: first.value.continuationToken,
      })
      .next();
    expect(resumed.done).toBe(false);
    expect(resumed.value[0].id).not.toBe(first.value[0].id);
    const ids = [];
    for await (const conversation of operations.list(recorded.agentName)) ids.push(conversation.id);
    expect(ids).toEqual(
      expect.arrayContaining([recorded.conversationId, recorded.secondConversationId]),
    );
  });

  it("gets a finalized conversation", async () => {
    const conversation = await client.voiceAgents.conversations.get(
      recorded.agentName,
      recorded.conversationId,
    );
    expect(conversation).toMatchObject({
      id: recorded.conversationId,
      object: "voice.conversation",
      status: "completed",
    });
    expect(conversation.created_at).toBeInstanceOf(Date);
    expect(conversation.completed_at).toBeInstanceOf(Date);
    expect(conversation.last_error).toBeUndefined();
    expect(conversation.usage?.total_tokens).toBeGreaterThan(0);
  });

  it("lists conversation items and resumes a page", async () => {
    const operations = client.voiceAgents.conversations;
    const first = await operations
      .listItems(recorded.agentName, recorded.conversationId, { limit: 1 })
      .byPage()
      .next();
    expect(first.value).toHaveLength(1);
    expect(first.value.continuationToken).toBeTruthy();
    const resumed = await operations
      .listItems(recorded.agentName, recorded.conversationId, { limit: 1 })
      .byPage({ continuationToken: first.value.continuationToken })
      .next();
    expect(resumed.done).toBe(false);
    expect(resumed.value[0].id).not.toBe(first.value[0].id);
    const ids = [];
    for await (const item of operations.listItems(recorded.agentName, recorded.conversationId)) {
      if (!("id" in item)) throw new Error("Persisted conversation item did not include an ID.");
      ids.push(item.id);
    }
    expect(ids).toEqual(expect.arrayContaining([recorded.inputId, recorded.outputId]));
  });

  it("gets captured input and output items", async () => {
    for (const [itemId, role] of [
      [recorded.inputId, "user"],
      [recorded.outputId, "assistant"],
    ]) {
      const item = await client.voiceAgents.conversations.getItem(
        recorded.agentName,
        recorded.conversationId,
        itemId,
      );
      expect(item).toMatchObject({
        id: itemId,
        type: "message",
        role,
        content: expect.arrayContaining([
          expect.objectContaining({ type: role === "user" ? "input_audio" : "output_audio" }),
        ]),
      });
    }
  });

  it("lists responses and resumes a page", async () => {
    const operations = client.voiceAgents.conversations;
    const first = await operations
      .listResponses(recorded.agentName, recorded.conversationId, { limit: 1 })
      .byPage()
      .next();
    expect(first.value).toHaveLength(1);
    expect(first.value.continuationToken).toBeTruthy();
    const resumed = await operations
      .listResponses(recorded.agentName, recorded.conversationId, { limit: 1 })
      .byPage({ continuationToken: first.value.continuationToken })
      .next();
    expect(resumed.done).toBe(false);
    expect(resumed.value[0].id).not.toBe(first.value[0].id);
    const responses = [];
    for await (const response of operations.listResponses(
      recorded.agentName,
      recorded.conversationId,
    )) {
      responses.push(response);
    }
    expect(responses).toHaveLength(2);
    expect(responses).toContainEqual(expect.objectContaining({ id: recorded.responseId }));
    for (const response of responses) {
      expect(response.status).toBe("completed");
      expect(response.created_at).toBeInstanceOf(Date);
    }
  });

  it("gets a response with its output and usage", async () => {
    const response = await client.voiceAgents.conversations.getResponse(
      recorded.agentName,
      recorded.conversationId,
      recorded.responseId,
    );
    expect(response).toMatchObject({
      id: recorded.responseId,
      conversation_id: recorded.conversationId,
      status: "completed",
    });
    expect(response.output).toContainEqual(expect.objectContaining({ id: recorded.outputId }));
    expect(response.created_at).toBeInstanceOf(Date);
    expect(response.completed_at).toBeInstanceOf(Date);
    expect(response.usage?.total_tokens).toBeGreaterThan(0);
  });

  it("lists the output items belonging to a response", async () => {
    const items = [];
    for await (const item of client.voiceAgents.conversations.listResponseItems(
      recorded.agentName,
      recorded.conversationId,
      recorded.responseId,
      { limit: 1 },
    )) {
      items.push(item);
    }
    expect(items).toContainEqual(
      expect.objectContaining({ id: recorded.outputId, role: "assistant" }),
    );
    expect(items.every((item) => "role" in item && item.role === "assistant")).toBe(true);
  });

  it("gets merged stereo recording metadata", async () => {
    const audio = await client.voiceAgents.conversations.getAudio(
      recorded.agentName,
      recorded.conversationId,
    );
    expect(audio).toMatchObject({
      conversation_id: recorded.conversationId,
      format: "wav",
      sample_rate: 24000,
      channels: 2,
      channel_layout: { left: "user", right: "agent" },
    });
    expect(audio.duration_ms).toBeGreaterThan(0);
  });

  it("downloads the merged stereo recording", async () => {
    await expectWav(
      await client.voiceAgents.conversations.downloadAudio(
        recorded.agentName,
        recorded.conversationId,
      ),
      2,
    );
  });

  it("gets input and output audio metadata", async () => {
    for (const [itemId, role] of [
      [recorded.inputId, "user"],
      [recorded.outputId, "agent"],
    ]) {
      const audio = await client.voiceAgents.conversations.getAudioItem(
        recorded.agentName,
        recorded.conversationId,
        itemId,
      );
      expect(audio).toMatchObject({
        conversation_id: recorded.conversationId,
        item_id: itemId,
        role,
        format: "wav",
        codec: "pcm16",
        sample_rate: 24000,
        channels: 1,
      });
      expect(audio.duration_ms).toBeGreaterThan(0);
    }
  });

  it("downloads captured input and output audio", async () => {
    for (const itemId of [recorded.inputId, recorded.outputId]) {
      await expectWav(
        await client.voiceAgents.conversations.downloadAudioItem(
          recorded.agentName,
          recorded.conversationId,
          itemId,
        ),
        1,
      );
    }
  });

  it("returns not found for generated audio when playback was not interrupted", async () => {
    const operations = client.voiceAgents.conversations;
    await expect(
      operations.getGeneratedAudioItem(
        recorded.agentName,
        recorded.conversationId,
        recorded.outputId,
      ),
    ).rejects.toMatchObject({ statusCode: 404 });
    await expect(
      operations.downloadGeneratedAudioItem(
        recorded.agentName,
        recorded.conversationId,
        recorded.outputId,
      ),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("deletes a stored conversation and its responses, items and audio", async () => {
    const operations = client.voiceAgents.conversations;
    await operations.delete(recorded.agentName, recorded.deletedConversationId);
    await expect(
      operations.get(recorded.agentName, recorded.deletedConversationId),
    ).rejects.toMatchObject({ statusCode: 404 });
    await expect(
      operations.listResponses(recorded.agentName, recorded.deletedConversationId).next(),
    ).rejects.toMatchObject({ statusCode: 404 });
    await expect(
      operations.listItems(recorded.agentName, recorded.deletedConversationId).next(),
    ).rejects.toMatchObject({ statusCode: 404 });
    await expect(
      operations.getAudio(recorded.agentName, recorded.deletedConversationId),
    ).rejects.toMatchObject({ statusCode: 404 });
  });
});
