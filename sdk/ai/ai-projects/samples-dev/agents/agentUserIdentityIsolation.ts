// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates per-user Hosted Agent isolation while sending
 * delegated end-user identities in the `x-ms-user-identity` header.
 *
 * It uploads a code zip as a new Hosted Agent version, routes the agent
 * endpoint to that version, and then invokes the same Hosted Agent as two
 * different delegated users. The sample shows that a follow-up request can
 * continue a prior response chain only when the delegated user identity
 * matches the user who started it:
 *
 *   - First delegated user: "1 + 1 = ?" then "then + 10"
 *   - Second delegated user: attempting "then + 10" against the first user's
 *     response chain is expected to fail with `404 NotFound`, confirming the
 *     response history is isolated per delegated user.
 *
 * Hosted agents run under a managed identity that must be granted access to
 * the model (RBAC). That role assignment is configured out of band and is not
 * part of this sample.
 *
 * @summary This sample demonstrates how to isolate Hosted Agent response
 * chains per delegated end-user using the `x-ms-user-identity` header.
 *
 * @azsdk-weight 70
 */

import type {
  AgentEndpointConfig,
  CreateAgentVersionFromCodeContent,
  FixedRatioVersionSelectionRule,
  HostedAgentDefinition,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { NotFoundError } from "openai";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = "MyHostedAgent";

// Two delegated end-user identities. Provide fixed values via environment
// variables, or fall back to random UUIDs.
const delegatedUserIdentity = process.env["DELEGATED_USER_IDENTITY"] || randomUUID();
const delegatedUserIdentity2 = process.env["DELEGATED_USER_IDENTITY_2"] || randomUUID();

const codeZipPath = path.resolve(__dirname, "assets/responses-echo-agent.zip");

function sha256Hex(data: Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  let createdVersion: string | undefined;
  let originalAgentEndpoint: AgentEndpointConfig | undefined;

  try {
    // ── Create a hosted agent version from code ─────────────────────────
    const codeZip = readFileSync(codeZipPath);
    const codeZipSha256 = sha256Hex(codeZip);

    const definition: HostedAgentDefinition = {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      code_configuration: {
        runtime: "python_3_14",
        entry_point: ["python", "main.py"],
        dependency_resolution: "bundled",
      },
      environment_variables: {
        FOUNDRY_PROJECT_ENDPOINT: projectEndpoint,
        FOUNDRY_MODEL_NAME: modelName,
        AGENT_INSTRUCTIONS:
          "You are a helpful assistant that answers arithmetic questions. " +
          "Use the prior response context to resolve follow-up math questions like 'then + 10'.",
      },
      protocol_versions: [{ protocol: "responses", version: "1.0.0" }],
    };

    const content: CreateAgentVersionFromCodeContent = {
      metadata: {
        description: "Hosted agent version for delegated user identity isolation.",
        definition,
      },
      code: { contents: codeZip, contentType: "application/zip", filename: "code.zip" },
    };

    console.log("Creating hosted agent version from code...");
    const created = await project.agents.createVersionFromCode(agentName, codeZipSha256, content);
    const version = created.version;
    createdVersion = version;
    console.log(
      `Hosted agent version created (id: ${created.id}, name: ${created.name}, version: ${version})`,
    );
    console.log(`User 1: ${delegatedUserIdentity}`);
    console.log(`User 2: ${delegatedUserIdentity2}`);

    // ── Poll until the agent version is active ──────────────────────────
    for (let attempt = 0; attempt < 60; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      const versionDetails = await project.agents.getVersion(agentName, version);
      console.log(`Hosted agent status: ${versionDetails.status} (attempt ${attempt + 1}/60)`);
      if (versionDetails.status === "active") break;
      if (versionDetails.status === "failed") {
        throw new Error(`Hosted agent provisioning failed: ${JSON.stringify(versionDetails)}`);
      }
      if (attempt === 59) {
        throw new Error("Timed out waiting for the hosted agent version to become active");
      }
    }

    // ── Route the agent endpoint to the new version ─────────────────────
    originalAgentEndpoint = (await project.agents.get(agentName)).agent_endpoint;

    const endpointConfig: AgentEndpointConfig = {
      version_selector: {
        version_selection_rules: [
          {
            type: "FixedRatio",
            agent_version: version,
            traffic_percentage: 100,
          } as FixedRatioVersionSelectionRule,
        ],
      },
      protocol_configuration: { responses: {} },
    };
    await project.agents.updateAgent(agentName, { agentEndpoint: endpointConfig });
    console.log(`Agent endpoint configured for version ${version}`);

    // ── Invoke the hosted agent as two delegated users ──────────────────
    const openAIClient = project.getOpenAIClient({
      azureConfig: { allowPreview: true, agentName },
    });

    // First delegated user starts a response chain
    console.log("\nUser 1 input: 1 + 1 = ?");
    const response = await openAIClient.responses.create(
      {
        input: "1 + 1 = ?",
      },
      {
        headers: { "x-ms-user-identity": delegatedUserIdentity },
      },
    );
    console.log(`Agent: ${response.output_text}`);

    // Second delegated user tries to continue User 1's chain — expected to fail
    console.log(
      "\nUser 2 input: then + 10.  Check whether the agent can continue User 1's response chain.",
    );
    try {
      await openAIClient.responses.create(
        {
          input: "then + 10",
          previous_response_id: response.id,
        },
        {
          headers: { "x-ms-user-identity": delegatedUserIdentity2 },
        },
      );
      console.log("Agent: Unexpected — User 2 continued User 1's response chain.");
    } catch (e) {
      if (e instanceof NotFoundError) {
        console.log(
          "Agent: Expected isolation behavior confirmed. " +
            "A different delegated user cannot continue the previous response chain and must start a new conversation.",
        );
      } else {
        throw e;
      }
    }

    // First delegated user continues their own chain
    console.log("\nUser 1 input: then + 10");
    const followUp = await openAIClient.responses.create(
      {
        input: "then + 10",
        previous_response_id: response.id,
      },
      {
        headers: { "x-ms-user-identity": delegatedUserIdentity },
      },
    );
    console.log(`Agent: ${followUp.output_text}`);
  } finally {
    // ── Restore the endpoint and delete the created version ─────────────
    if (originalAgentEndpoint !== undefined) {
      await project.agents.updateAgent(agentName, { agentEndpoint: originalAgentEndpoint });
      console.log("Agent endpoint restored");
    }

    if (createdVersion !== undefined) {
      await project.agents.deleteVersion(agentName, createdVersion, { force: true });
      console.log(`Hosted agent version ${createdVersion} deleted`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
