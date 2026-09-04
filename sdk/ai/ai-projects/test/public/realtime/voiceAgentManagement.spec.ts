// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it, beforeEach, afterEach } from "vitest";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AIProjectClient, VoiceAgentDefinition } from "@azure/ai-projects";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";

const preview = "VoiceAgents=V1Preview" as const;

describe("AIProjectClient Voice Agent management (recorded)", () => {
  let recorder: Recorder;
  let client: AIProjectClient;

  beforeEach(async (context: VitestTestContext) => {
    recorder = await createRecorder(context);
    client = createProjectsClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("generates, gets, updates, lists, and deletes a voice agent", async () => {
    const agentName = "voice-agent-mgmt-test";
    const generated = await client.agents.generateAgent({ kind: "voice", name: agentName });

    try {
      assert.equal(generated.name, agentName);
      assert.equal(generated.versions.latest.definition.kind, "voice");

      const retrieved = await client.agents.get(agentName);
      const definition = retrieved.versions.latest.definition as VoiceAgentDefinition;
      assert.equal(definition.kind, "voice");

      definition.instructions = "Be concise and helpful.";
      const updated = await client.agents.update(agentName, definition, {
        foundryFeatures: preview,
      });
      assert.equal(
        (updated.versions.latest.definition as VoiceAgentDefinition).instructions,
        "Be concise and helpful.",
      );
      assert.notEqual(updated.versions.latest.version, generated.versions.latest.version);

      const listed: string[] = [];
      for await (const agent of client.agents.list({ kind: "voice", limit: 20 })) {
        listed.push(agent.name);
      }
      assert.include(listed, agentName);
    } finally {
      await client.agents.delete(agentName);
    }
  });

  it("creates a voice agent with text output modality", async () => {
    const agentName = "voice-agent-text-output";
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: "gpt-realtime",
      instructions: "Respond with text output",
      output_modalities: ["text"],
    };

    try {
      const created = await client.agents.create(agentName, definition, {
        foundryFeatures: preview,
      });
      const def = created.versions.latest.definition as VoiceAgentDefinition;
      assert.deepEqual(def.output_modalities, ["text"]);
    } finally {
      await client.agents.delete(agentName);
    }
  });

  it("creates a voice agent with function tools", async () => {
    const agentName = "voice-agent-with-tools";
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: "gpt-realtime",
      instructions: "Use tools when necessary",
      output_modalities: ["text"],
      tools: [
        {
          type: "function",
          name: "get_weather",
          description: "Get the current weather",
          parameters: {
            type: "object",
            properties: {
              location: { type: "string", description: "City name" },
            },
            required: ["location"],
          },
        },
      ],
    };

    try {
      const created = await client.agents.create(agentName, definition, {
        foundryFeatures: preview,
      });
      const def = created.versions.latest.definition as VoiceAgentDefinition;
      assert.ok(def.tools && def.tools.length > 0);
      assert.equal(def.tools[0].type, "function");
    } finally {
      await client.agents.delete(agentName);
    }
  });
});
