// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate a voice agent from a natural-language goal.
 *
 * @summary Generate and inspect a managed voice agent, then delete the sample agent.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

async function main() {
  // Set FOUNDRY_PROJECT_ENDPOINT in .env to a project with voice agents enabled.
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  if (!projectEndpoint) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT before running this sample.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };

  console.log("Generating a voice agent from a goal...");
  const agent = await project.beta.agents.createFromPrompt({
    kind: "voice",
    name: `sample-generated-voice-${Date.now()}`,
    model_type: "managed",
    use_case: "Travel information",
    goal: "Help callers find information about public transport. Do not make bookings.",
  }, options);
  try {
    console.log(`Generated agent: ${agent.name}`);
    const savedAgent = await project.agents.get(agent.name, options);
    console.log("Generated definition:", savedAgent.versions.latest.definition);
  } finally {
    console.log("Deleting the generated sample agent...");
    await project.agents.delete(agent.name, options);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

module.exports = { main };
