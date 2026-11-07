// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Inspect stored Realtime or GPT Live conversations and optionally download WAV recordings.
 * @azsdk-weight 50
 */

import { AIProjectClient } from "@azure/ai-projects";
import type { VoiceAudioItem, VoiceGeneratedAudioItem, VoiceRecording } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { createWriteStream } from "node:fs";
import { stat, writeFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  const agentName = process.env["FOUNDRY_AGENT_NAME"]?.trim();
  if (!projectEndpoint || !agentName) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_AGENT_NAME.");
  }
  const protocol = process.env["FOUNDRY_VOICE_CONVERSATION_PROTOCOL"]?.trim() || "realtime";
  if (protocol !== "realtime" && protocol !== "live") {
    throw new Error("FOUNDRY_VOICE_CONVERSATION_PROTOCOL must be realtime or live.");
  }
  const generatedItemId = process.env["FOUNDRY_VOICE_GENERATED_AUDIO_ITEM_ID"]?.trim();
  const generatedOutput = process.env["FOUNDRY_VOICE_GENERATED_AUDIO_OUTPUT_FILE"]?.trim();
  if (protocol === "live" && (generatedItemId || generatedOutput)) {
    throw new Error("Generated-but-unheard item audio is a Realtime conversation API.");
  }
  if (generatedOutput && !generatedItemId) {
    throw new Error("Set FOUNDRY_VOICE_GENERATED_AUDIO_ITEM_ID to download generated item audio.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const conversations =
    protocol === "live"
      ? project.beta.voiceAgents.liveConversations
      : project.beta.voiceAgents.conversations;
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };

  // Only inspect one page. No stored conversation or existing agent is modified.
  let conversationId = process.env["FOUNDRY_VOICE_CONVERSATION_ID"]?.trim();
  for await (const page of conversations
    .list(agentName, { ...options, limit: 5, order: "desc" })
    .byPage()) {
    console.log(
      `Stored ${protocol} conversation IDs:`,
      page.map((item) => item.id),
    );
    conversationId ||= page[0]?.id;
    break;
  }
  if (!conversationId) {
    console.log("No stored conversations. First complete a session connected with store: true.");
    return;
  }
  const conversation = await conversations.get(agentName, conversationId, options);
  console.log(`Conversation ${conversation.id}: ${conversation.status}`);
  let itemId = process.env["FOUNDRY_VOICE_CONVERSATION_ITEM_ID"]?.trim();
  for await (const page of conversations
    .listItems(agentName, conversationId, { ...options, limit: 5, order: "asc" })
    .byPage()) {
    // Unknown future item variants need not expose an addressable ID.
    for (const item of page) {
      console.log(`Stored item type: ${item.type}`);
      if (!itemId && "id" in item && typeof item.id === "string") itemId = item.id;
    }
    break;
  }
  if (itemId) {
    const stored = await conversations.getItem(agentName, conversationId, itemId, options);
    // Do not print stored caller transcripts or delegated payloads.
    console.log(`Selected item ${itemId}: ${stored.type}`);
  }

  if (protocol === "realtime") {
    const realtime = project.beta.voiceAgents.conversations;
    let responseId: string | undefined;
    for await (const page of realtime
      .listResponses(agentName, conversationId, { ...options, limit: 1, order: "desc" })
      .byPage()) {
      responseId = page[0]?.id;
      break;
    }
    if (responseId) {
      const response = await realtime.getResponse(agentName, conversationId, responseId, options);
      console.log(`Stored response ${response.id}: ${response.status}`);
      for await (const page of realtime
        .listResponseItems(agentName, conversationId, responseId, { ...options, limit: 5 })
        .byPage()) {
        console.log(
          "Response item types:",
          page.map((item) => item.type),
        );
        break;
      }
    } else {
      console.log("No stored response ID is available for response-specific inspection.");
    }
  }

  const audioItemId = process.env["FOUNDRY_VOICE_AUDIO_ITEM_ID"]?.trim();
  const recordingOutput = process.env["FOUNDRY_VOICE_RECORDING_OUTPUT_FILE"]?.trim();
  if (audioItemId) {
    const audio = await conversations.getAudioItem(agentName, conversationId, audioItemId, options);
    printAudioMetadata("Item audio", audio);
    if (recordingOutput) {
      requireManagedStorage(audio);
      await saveAudio(
        await conversations.downloadAudioItem(agentName, conversationId, audioItemId, options),
        recordingOutput,
      );
    }
  } else if (recordingOutput) {
    const audio = await conversations.getAudio(agentName, conversationId, options);
    printAudioMetadata("Merged recording", audio);
    requireManagedStorage(audio);
    await saveAudio(
      await conversations.downloadAudio(agentName, conversationId, options),
      recordingOutput,
    );
  }
  if (protocol === "realtime" && generatedItemId) {
    // This artifact requires an interrupted/truncated item with generated audio beyond the heard segment.
    const realtime = project.beta.voiceAgents.conversations;
    const audio = await realtime.getGeneratedAudioItem(
      agentName,
      conversationId,
      generatedItemId,
      options,
    );
    printAudioMetadata("Generated-but-unheard audio", audio);
    if (generatedOutput) {
      requireManagedStorage(audio);
      await saveAudio(
        await realtime.downloadGeneratedAudioItem(
          agentName,
          conversationId,
          generatedItemId,
          options,
        ),
        generatedOutput,
      );
    }
  }
}

function printAudioMetadata(
  label: string,
  audio: VoiceRecording | VoiceAudioItem | VoiceGeneratedAudioItem,
): void {
  console.log(label, {
    format: audio.format,
    sample_rate: audio.sample_rate,
    channels: audio.channels,
    duration_ms: audio.duration_ms,
  });
}

function requireManagedStorage(
  audio: VoiceRecording | VoiceAudioItem | VoiceGeneratedAudioItem,
): void {
  if (audio.blob_uri) {
    throw new Error("For BYOS audio, download blob_uri using your own storage credentials.");
  }
}

async function saveAudio(
  response: { readableStreamBody?: NodeJS.ReadableStream; blobBody?: Promise<Blob> },
  file: string,
): Promise<void> {
  if (response.readableStreamBody) {
    await pipeline(response.readableStreamBody, createWriteStream(file));
  } else if (response.blobBody) {
    await writeFile(file, new Uint8Array(await (await response.blobBody).arrayBuffer()));
  } else {
    throw new Error("The audio response did not contain a readable body.");
  }
  console.log(`Saved ${(await stat(file)).size} WAV bytes to ${file}.`);
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
