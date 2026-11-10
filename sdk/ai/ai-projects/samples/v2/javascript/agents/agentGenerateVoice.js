// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Generate a voice agent from a goal, inspect its definition, and clean up.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

async function main() {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  if (!projectEndpoint) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT before running this sample.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  console.log("Generating a voice agent...");
  const agent = await project.agents.createFromPrompt({
    kind: "voice",
    name: `sample-generated-voice-${Date.now()}`,
    model_type: "managed",
    use_case: "Travel information",
    goal: "Help callers find information about public transport. Do not make bookings.",
  });
  try {
    console.log(`Generated agent: ${agent.name}`);
    const savedAgent = await project.agents.get(agent.name);
    console.log("Generated definition:", savedAgent.versions.latest.definition);
  } finally {
    console.log("Deleting the sample agent...");
    await project.agents.delete(agent.name);
  }
}

main().catch((error) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});

module.exports = { main };
