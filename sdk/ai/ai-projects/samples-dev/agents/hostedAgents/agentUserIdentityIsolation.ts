// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates per-user Hosted Agent isolation while sending
 * delegated end-user identities in the `x-ms-user-identity` header.
 *
 * It packages the `basic-agent` code zip as a new Hosted Agent version,
 * routes the agent endpoint to that version, and then invokes the same
 * Hosted Agent as two different delegated users. The sample shows that a
 * follow-up request can continue a prior response chain only when the
 * delegated user identity matches the user who started it:
 *
 * - First delegated user: "1 + 1 = ?" then "then + 10" -> 12
 * - Second delegated user: attempting "then + 10" against the first user's
 *   response chain is expected to fail with `404 NotFound`, confirming the
 *   response history is isolated per delegated user.
 *
 * The agent must already exist; create it first with the `createHostedAgent` sample.
 *
 * @summary Demonstrates per-user hosted agent isolation via the `x-ms-user-identity` header.
 *
 * @azsdk-weight 70
 */

import type {
  AgentEndpointConfig,
  CreateAgentVersionFromCodeContent,
  HostedAgentDefinition,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";
const delegatedUserIdentity = process.env["DELEGATED_USER_IDENTITY"] || randomUUID();
const delegatedUserIdentity2 = process.env["DELEGATED_USER_IDENTITY_2"] || randomUUID();

const codeZipPath = path.resolve(__dirname, "../assets/basic-agent.zip");

function sha256Hex(data: Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const codeZip = readFileSync(codeZipPath);
  const codeZipSha256 = sha256Hex(codeZip);

  const definition: HostedAgentDefinition = {
    kind: "hosted",
    cpu: "0.5",
    memory: "1Gi",
    protocol_versions: [{ protocol: "responses", version: "2.0.0" }],
    code_configuration: {
      runtime: "python_3_14",
      entry_point: ["python", "main.py"],
      dependency_resolution: "remote_build",
    },
    environment_variables: {
      FOUNDRY_PROJECT_ENDPOINT: projectEndpoint,
      FOUNDRY_MODEL_NAME: modelName,
      AGENT_STORE_RESPONSES: "true",
      AGENT_INSTRUCTIONS:
        "You are a helpful assistant that answers arithmetic questions. " +
        "Use the prior response context to resolve follow-up math questions like 'then + 10'.",
    },
  };

  // ── Create a new version on the existing agent ──────────────────────
  console.log("Creating code-based agent version (dependency_resolution=remote_build)...");
  const content: CreateAgentVersionFromCodeContent = {
    metadata: {
      description: "Hosted agent version for delegated user identity isolation.",
      definition,
    },
    code: { contents: codeZip, contentType: "application/zip", filename: "code.zip" },
  };

  const created = await project.agents.createVersionFromCode(agentName, codeZipSha256, content);
  const createdVersion = created.version;
  console.log(`Created code-based hosted agent version: ${createdVersion}`);

  // Capture the current endpoint so it can be restored during cleanup.
  const originalAgentEndpoint = (await project.agents.get(agentName)).agent_endpoint;

  try {
    // ── Poll until agent version is active ─────────────────────────────
    for (let attempt = 0; attempt < 60; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 3_000));
      const versionDetails = await project.agents.getVersion(agentName, createdVersion);
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

    // ── Route the agent endpoint to the new version ────────────────────
    const endpointConfig: AgentEndpointConfig = {
      version_selector: {
        version_selection_rules: [
          {
            type: "FixedRatio",
            agent_version: createdVersion,
            traffic_percentage: 100,
          },
        ],
      },
      protocol_configuration: { responses: {} },
    };
    await project.agents.updateAgent(agentName, { agentEndpoint: endpointConfig });
    console.log(`Agent endpoint configured for version ${createdVersion}`);

    // ── Invoke the agent as two different delegated users ──────────────
    const openAIClient = project.getOpenAIClient({
      azureConfig: { allowPreview: true, agentName },
    });

    console.log("User 1 input: 1 + 1 = ?");
    const response = await openAIClient.responses.create(
      { input: "1 + 1 = ?" },
      { headers: { "x-ms-user-identity": delegatedUserIdentity } },
    );
    console.log(`Agent: ${response.output_text}`);

    console.log(
      "User 2 input: then + 10.  Check if the agent can continue the previous response chain from User 1.",
    );
    try {
      await openAIClient.responses.create(
        { input: "then + 10", previous_response_id: response.id },
        { headers: { "x-ms-user-identity": delegatedUserIdentity2 } },
      );
      console.log(
        "Agent: Unexpected success. Response history was NOT isolated per delegated user.",
      );
    } catch (err: any) {
      if (err?.status === 404) {
        console.log(
          "Agent: Expected isolation behavior confirmed. " +
            "A different delegated user cannot continue the previous response chain and must start a new conversation.",
        );
      } else {
        throw err;
      }
    }

    console.log("User 1 input: then + 10");
    const followUp = await openAIClient.responses.create(
      { input: "then + 10", previous_response_id: response.id },
      { headers: { "x-ms-user-identity": delegatedUserIdentity } },
    );
    console.log(`Agent: ${followUp.output_text}`);
  } finally {
    // ── Cleanup ─────────────────────────────────────────────────────────
    console.log("\nCleaning up resources...");

    if (originalAgentEndpoint) {
      await project.agents.updateAgent(agentName, { agentEndpoint: originalAgentEndpoint });
      console.log("Agent endpoint restored");
    }

    await project.agents.deleteVersion(agentName, createdVersion, { force: true });
    console.log(`Agent version ${createdVersion} deleted.`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
