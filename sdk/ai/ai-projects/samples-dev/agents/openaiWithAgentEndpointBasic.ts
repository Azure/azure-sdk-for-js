// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Hosted Agent and Session,
 * configure an Agent endpoint for Responses protocol, and invoke the
 * OpenAI Responses API against that agent endpoint using the
 * AIProjectClient.
 *
 * Sessions only work with Hosted Agents.
 *
 * Session and Agent endpoint operations are currently preview features.
 *
 * @summary Demonstrates creating a hosted agent, session, and calling
 * the OpenAI Responses API via the agent endpoint.
 *
 * @azsdk-weight 100
 */

import type {
  HostedAgentDefinition,
  ProtocolVersionRecord,
  VersionRefIndicator,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const image = process.env["FOUNDRY_AGENT_CONTAINER_IMAGE"] || "<agent image>";
const agentName = "MySessionHostedAgent";
const isolationKey = "sample-isolation-key";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // ── Create a hosted agent version ─────────────────────────────────────
  console.log("Creating agent...");
  const agent = await project.agents.createVersion(
    agentName,
    {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      image,
      container_protocol_versions: [
        { protocol: "responses", version: "v1" } as ProtocolVersionRecord,
      ],
    } as HostedAgentDefinition,
    {
      foundryFeatures: "HostedAgents=V1Preview",
      metadata: { enableVnextExperience: "true" },
    },
  );
  console.log(`Agent created (name: ${agent.name}, version: ${agent.version})`);

  // Poll until agent version is active
  for (let attempt = 0; attempt < 60; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 3_000));
    const versionDetails = await project.agents.getVersion(agentName, agent.version);
    const status = versionDetails.status;
    console.log(`Agent version status: ${status} (attempt ${attempt + 1})`);
    if (status === "active") break;
    if (status === "failed") {
      throw new Error(`Agent version provisioning failed: ${JSON.stringify(versionDetails)}`);
    }
    if (attempt === 59) {
      throw new Error("Timed out waiting for agent version to become active");
    }
  }

  // ── Create a session ──────────────────────────────────────────────────
  const versionIndicator: VersionRefIndicator = {
    type: "version_ref",
    agent_version: agent.version,
  };
  const session = await project.beta.agents.createSession(
    agentName,
    isolationKey,
    versionIndicator,
  );
  console.log(`Session created (id: ${session.agent_session_id}, status: ${session.status})`);

  try {
    // ── Create an OpenAI client bound to the agent endpoint ─────────────
    const openAIClient = project.getOpenAIClient({
      azureConfig: { allowPreview: true, agentName },
    });

    // ── Call Responses API bound to the agent session ───────────────────
    console.log("\nGenerating response...");
    const response = await openAIClient.responses.create(
      {
        input: "What is the size of France in square miles?",
      },
      {
        body: { agent_session_id: session.agent_session_id },
      },
    );
    console.log(`Response output: ${response.output_text}`);
  } finally {
    // ── Cleanup ─────────────────────────────────────────────────────────
    console.log("\nCleaning up resources...");

    await project.beta.agents.deleteSession(agentName, session.agent_session_id, isolationKey);
    console.log(`Session with id: ${session.agent_session_id} deleted.`);

    await project.agents.deleteVersion(agentName, agent.version);
    console.log(`Agent version ${agent.version} deleted.`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
