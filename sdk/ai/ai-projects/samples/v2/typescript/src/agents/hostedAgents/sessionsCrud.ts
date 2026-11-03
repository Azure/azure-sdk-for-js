// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform CRUD operations on agent Sessions
 * using the AIProjectClient.
 *
 * Sessions only work with Hosted Agents. It uploads the `basic-agent` code
 * zip as a temporary Hosted Agent version, then creates, retrieves, lists,
 * and deletes a session against that version.
 *
 * The agent must already exist; create it first with the `createHostedAgent` sample.
 *
 * @summary Demonstrates create, get, list, and delete operations on hosted agent sessions.
 */

import type {
  CreateAgentVersionFromCodeContent,
  HostedAgentDefinition,
  VersionRefIndicator,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "MyHostedAgent";

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
    },
  };

  // ── Create a temporary hosted agent version from code ─────────────────
  const content: CreateAgentVersionFromCodeContent = {
    metadata: {
      description: "Sessions CRUD hosted agent uploaded from assets/basic-agent.",
      definition,
    },
    code: { contents: codeZip, contentType: "application/zip", filename: "code.zip" },
  };
  const created = await project.agents.createVersionFromCode(agentName, codeZipSha256, content);
  const createdVersion = created.version;
  console.log(`Created code-based hosted agent version: ${createdVersion}`);

  try {
    // Poll until agent version is active
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

    // ── Create a session ────────────────────────────────────────────────
    const versionIndicator: VersionRefIndicator = {
      type: "version_ref",
      agent_version: createdVersion,
    };
    const session = await project.agents.createSession(agentName, versionIndicator);
    console.log(`Created session (id: ${session.agent_session_id}, status: ${session.status})`);

    // ── Retrieve the session by its ID ──────────────────────────────────
    const fetched = await project.agents.getSession(agentName, session.agent_session_id);
    console.log(`Retrieved session (id: ${fetched.agent_session_id}, status: ${fetched.status})`);

    // ── List sessions for the agent ─────────────────────────────────────
    console.log("Listing sessions for the agent...");
    console.log("Sessions:");
    for await (const item of project.agents.listSessions(agentName)) {
      console.log(`  - ${item.agent_session_id} (status: ${item.status})`);
    }

    // ── Delete the session ──────────────────────────────────────────────
    await project.agents.deleteSession(agentName, session.agent_session_id);
    console.log(`Deleted session (id: ${session.agent_session_id})`);
  } finally {
    await project.agents.deleteVersion(agentName, createdVersion, { force: true });
    console.log(`Agent version ${createdVersion} deleted.`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
