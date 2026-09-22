// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform CRUD operations on External Agents
 * using the AIProjectClient.
 *
 * External Agents are a preview feature. They register third-party agents hosted
 * outside Microsoft Foundry. Registration is metadata-only: Foundry uses the
 * OpenTelemetry agent identifier to light up traces and evaluations for spans
 * emitted by your external agent.
 *
 * @summary Demonstrates CRUD operations on external agents using the AIProjectClient.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const agentName = "sample-external-agent";
  const otelAgentId = "sample-external-agent";

  // Clean up any leftover agent from a previous run.
  try {
    await project.agents.delete(agentName, { force: true });
    console.log(`External agent \`${agentName}\` deleted`);
  } catch (error) {
    if (error.statusCode !== 404) {
      throw error;
    }
  }

  // Create an external agent version. External agents are a preview feature,
  // so the `ExternalAgents=V1Preview` opt-in is required.
  const created = await project.agents.createVersion(
    agentName,
    {
      kind: "external",
      otel_agent_id: otelAgentId,
    },
    {
      foundryFeatures: "ExternalAgents=V1Preview",
      description: "External agent registered by the @azure/ai-projects sample.",
      metadata: { sample: "external_agents_crud", status: "created" },
    },
  );
  console.log(
    `Created external agent: ${created.name} version=${created.version} otel_agent_id=${otelAgentId}`,
  );

  // Retrieve the agent by name (latest version).
  const fetchedAgent = await project.agents.get(agentName);
  console.log(
    `Retrieved external agent: ${fetchedAgent.name} latest_version=${fetchedAgent.versions.latest.version}`,
  );

  // Retrieve a specific version of the agent.
  const fetchedVersion = await project.agents.getVersion(agentName, created.version);
  console.log(
    `Retrieved external agent version: ${fetchedVersion.name} version=${fetchedVersion.version}`,
  );

  // List external agents.
  const externalAgents = [];
  for await (const externalAgent of project.agents.list({ kind: "external", limit: 10 })) {
    externalAgents.push(externalAgent);
  }
  console.log(`Found ${externalAgents.length} external agents or more`);
  for (const externalAgent of externalAgents) {
    console.log(`  - ${externalAgent.name} (${externalAgent.id})`);
  }

  // Delete the external agent.
  const deleted = await project.agents.delete(agentName, { force: true });
  console.log(`Deleted external agent: ${deleted.name} deleted=${deleted.deleted}`);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
