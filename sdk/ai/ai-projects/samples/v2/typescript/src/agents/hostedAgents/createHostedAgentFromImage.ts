// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates creating a Hosted Agent version from a container
 * image, polling until it is active, routing the agent endpoint to that
 * version, and then invoking it via the OpenAI Responses API.
 *
 * @summary Create a hosted agent version from a container image, then invoke it via the Responses API.
 */

import type {
  AgentEndpointConfig,
  HostedAgentDefinition,
  ProtocolVersionRecord,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "MyHostedAgent";
const image = process.env["FOUNDRY_AGENT_CONTAINER_IMAGE"] || "<agent image>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // ── Create a hosted agent version from a container image ──────────────
  const created = await project.agents.createVersion(
    agentName,
    {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      container_configuration: { image },
      protocol_versions: [{ protocol: "responses", version: "1.0.0" } as ProtocolVersionRecord],
    } as HostedAgentDefinition,
    {
      metadata: { enableVnextExperience: "true" },
    },
  );
  console.log(`Created hosted agent version: ${created.version}`);

  // ── Poll until agent version is active ────────────────────────────────
  for (let attempt = 0; attempt < 60; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, 3_000));
    const versionDetails = await project.agents.getVersion(agentName, created.version);
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

  // ── Route the agent endpoint to the new version ───────────────────────
  const endpointConfig: AgentEndpointConfig = {
    version_selector: {
      version_selection_rules: [
        {
          type: "FixedRatio",
          agent_version: created.version,
          traffic_percentage: 100,
        },
      ],
    },
    protocol_configuration: { responses: {} },
  };
  await project.agents.updateAgent(agentName, { agentEndpoint: endpointConfig });
  console.log(`Agent endpoint configured for version ${created.version}`);

  const fetched = await project.agents.getVersion(agentName, created.version);
  console.log(`Fetched hosted agent version: ${fetched.version}, status: ${fetched.status}`);

  // ── Invoke the agent via the OpenAI Responses API ─────────────────────
  const openAIClient = project.getOpenAIClient({
    azureConfig: { allowPreview: true, agentName },
  });

  const userInput = "Good morning!";
  const response = await openAIClient.responses.create({ input: userInput });
  console.log(`Sent: ${userInput}`);
  console.log(`Response output: ${response.output_text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
