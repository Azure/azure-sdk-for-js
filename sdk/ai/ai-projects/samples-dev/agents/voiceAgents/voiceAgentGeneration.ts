// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates generating, retrieving, updating, listing, and deleting a voice agent.
 *
 * @summary manages a generated voice agent through the unified Foundry agents API.
 *
 * @azsdk-weight 100
 */

import { AIProjectClient, type AgentsListOptionalParams } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = getRequiredEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT");
const preview = "VoiceAgents=V1Preview" as const;

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const agentName = process.env["FOUNDRY_VOICE_AGENT_NAME"]?.trim() || `voice-gen-${Date.now()}`;
  const generated = await project.agents.generateAgent({ kind: "voice", name: agentName });

  try {
    console.log(`Generated ${generated.name}, version ${generated.versions.latest.version}`);

    const retrieved = await project.agents.get(generated.name);
    const definition = retrieved.versions.latest.definition;
    if (
      definition.kind !== "voice" ||
      !("model_type" in definition) ||
      !("model" in definition) ||
      typeof definition.model !== "string"
    ) {
      throw new Error(`Expected a voice definition, received ${definition.kind}.`);
    }
    console.log(`Retrieved ${retrieved.name}, state ${retrieved.state}`);

    // agents.update replaces the full definition; mutate the retrieved one instead of rebuilding it.
    definition.instructions = "You are a concise, friendly, and helpful voice assistant.";
    const updated = await project.agents.update(generated.name, definition, {
      foundryFeatures: preview,
    });
    console.log(`Updated ${updated.name}, version ${updated.versions.latest.version}`);

    console.log("Voice agents:");
    const listOptions: AgentsListOptionalParams = { kind: "voice", limit: 20 };
    for await (const agent of project.agents.list(listOptions)) {
      console.log(`- ${agent.name} (${agent.state})`);
    }
  } finally {
    await project.agents.delete(generated.name);
    console.log(`Deleted ${generated.name}`);
  }
}

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Set ${name} before running this sample.`);
  }
  return value;
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exitCode = 1;
});
