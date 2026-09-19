// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it, beforeEach, afterEach } from "vitest";
import { isLiveMode } from "@azure-tools/test-recorder";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AIProjectClient, VoiceAgentDefinition } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";

const isLive = isLiveMode();
const modelName = process.env["FOUNDRY_VOICE_AGENT_MODEL"]?.trim() || "gpt-realtime";
const preview = "VoiceAgents=V1Preview" as const;
// getVersion/get/delete/createFromPrompt have no `foundryFeatures` shorthand, so the preview
// opt-in required to read, remove, or generate a persisted voice agent must be passed as a
// raw header (see samples-dev/agents/agentGenerateVoice.ts for the same pattern).
const previewRequestOptions = { requestOptions: { headers: { "foundry-features": preview } } };

describe.runIf(isLive)("AIProjectClient Voice Agent CRUD (live)", () => {
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

  it("creates, retrieves, and deletes a voice agent version", async () => {
    const agentName = `voice-agent-crud-${Date.now()}`;
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "self_deployed",
      model: modelName,
      instructions: "Help callers find public transport information. Keep answers short.",
      greeting: { type: "template", text: "Hello! How can I help with your journey?" },
      output_modalities: ["audio"],
      store: false,
    };

    const created = await client.agents.createVersion(agentName, definition, {
      foundryFeatures: preview,
    });
    createdAgents.push(agentName);
    assert.equal(created.name, agentName);
    assert.equal(created.version, "1");
    console.log(`Created voice agent: ${created.name}, version: ${created.version}`);

    const retrieved = await client.agents.getVersion(
      agentName,
      created.version,
      previewRequestOptions,
    );
    assert.equal(retrieved.name, agentName);
    assert.isTrue("greeting" in retrieved.definition, "expected greeting to round-trip");
    if ("greeting" in retrieved.definition) {
      assert.deepEqual(retrieved.definition.greeting, definition.greeting);
    }
    assert.isTrue("store" in retrieved.definition, "expected store to round-trip");
    if ("store" in retrieved.definition) {
      assert.equal(retrieved.definition.store, false);
    }
    console.log(`Retrieved voice agent version: ${retrieved.version}`);

    const deleted = await client.agents.delete(agentName, previewRequestOptions);
    assert.isNotNull(deleted);
    console.log(`Deleted voice agent: ${agentName}`);
  });

  it("generates a voice agent from a natural-language goal", async () => {
    const agentName = `voice-agent-generated-${Date.now()}`;

    const generated = await client.beta.agents.createFromPrompt(
      {
        kind: "voice",
        name: agentName,
        model_type: "managed",
        use_case: "Travel information",
        goal: "Help callers find information about public transport. Do not make bookings.",
      },
      previewRequestOptions,
    );
    createdAgents.push(agentName);
    assert.equal(generated.name, agentName);
    console.log(`Generated voice agent: ${generated.name}`);

    const savedAgent = await client.agents.get(agentName, previewRequestOptions);
    const savedDefinition = savedAgent.versions.latest.definition;
    assert.equal(savedDefinition.kind, "voice");
    assert.isTrue("model_type" in savedDefinition, "expected a voice agent definition");
    console.log(
      `Generated definition model_type: ${(savedDefinition as VoiceAgentDefinition).model_type}`,
    );

    await client.agents.delete(agentName, previewRequestOptions);
    console.log(`Deleted voice agent: ${agentName}`);
  });

  it("updates a voice agent definition", async () => {
    const agentName = `voice-agent-update-${Date.now()}`;
    const originalDefinition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "self_deployed",
      model: modelName,
      instructions: "Original instructions.",
      output_modalities: ["audio"],
    };

    await client.agents.createVersion(agentName, originalDefinition, {
      foundryFeatures: preview,
    });
    createdAgents.push(agentName);
    console.log(`Created voice agent: ${agentName}`);

    const updatedDefinition: VoiceAgentDefinition = {
      ...originalDefinition,
      instructions: "Updated instructions after calling agents.update().",
    };
    const updated = await client.agents.update(agentName, updatedDefinition, {
      foundryFeatures: preview,
    });
    assert.equal(updated.name, agentName);
    console.log(`Updated voice agent: ${updated.name}`);

    const retrieved = await client.agents.get(agentName, previewRequestOptions);
    const retrievedDefinition = retrieved.versions.latest.definition;
    assert.isTrue("instructions" in retrievedDefinition, "expected instructions to round-trip");
    if ("instructions" in retrievedDefinition) {
      assert.equal(retrievedDefinition.instructions, updatedDefinition.instructions);
    }
    console.log("Verified updated instructions took effect");

    await client.agents.delete(agentName, previewRequestOptions);
    console.log(`Deleted voice agent: ${agentName}`);
  });
});
