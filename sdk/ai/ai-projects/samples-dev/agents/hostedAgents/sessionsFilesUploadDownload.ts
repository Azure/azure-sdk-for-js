// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to upload, list, download, and delete files
 * within an agent Session using the AIProjectClient.
 *
 * Sessions only work with Hosted Agents. It uploads the `basic-agent` code
 * zip as a temporary Hosted Agent version, creates a session, then exercises
 * the session file operations against that session.
 *
 * The agent must already exist; create it first with the `createHostedAgent` sample.
 *
 * @summary Demonstrates uploading, listing, downloading, and deleting hosted agent session files.
 *
 * @azsdk-weight 80
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
import { buffer } from "node:stream/consumers";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "MyHostedAgent";

const assetsDir = path.resolve(__dirname, "../assets");
const codeZipPath = path.join(assetsDir, "basic-agent.zip");
const dataFile1 = path.join(assetsDir, "data_file1.txt");
const dataFile2 = path.join(assetsDir, "data_file2.txt");
const remoteFilePath1 = "/remote/data_file1.txt";
const remoteFilePath2 = "/remote/data_file2.txt";

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
      description: "Session files hosted agent uploaded from assets/basic-agent.",
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
    console.log(`Session created (id: ${session.agent_session_id}, status: ${session.status})`);

    try {
      // ── Upload session files ──────────────────────────────────────────
      console.log(`Uploading session file: ${dataFile1} -> ${remoteFilePath1}`);
      await project.agents.uploadSessionFile(
        agentName,
        session.agent_session_id,
        remoteFilePath1,
        readFileSync(dataFile1),
      );

      console.log(`Uploading session file: ${dataFile2} -> ${remoteFilePath2}`);
      await project.agents.uploadSessionFile(
        agentName,
        session.agent_session_id,
        remoteFilePath2,
        readFileSync(dataFile2),
      );

      // ── List session files ────────────────────────────────────────────
      console.log("Listing session files for the session at path '/remote'...");
      const files = project.agents.listSessionFiles(agentName, session.agent_session_id, {
        path: "/remote",
      });
      for await (const entry of files) {
        console.log(
          `  - name=${entry.name}, size=${entry.size}, is_directory=${entry.is_directory}`,
        );
      }

      // ── Download and print a session file ──────────────────────────────
      console.log(`Downloading and printing content from '${remoteFilePath1}'`);
      const downloadResult = await project.agents.downloadSessionFile(
        agentName,
        session.agent_session_id,
        remoteFilePath1,
      );
      const fileContent = (await buffer(downloadResult.readableStreamBody!)).toString("utf-8");
      console.log(`Session file content (${remoteFilePath1}):\n${fileContent}`);

      // ── Delete session files ──────────────────────────────────────────
      console.log(`Deleting session file at path: ${remoteFilePath1}...`);
      await project.agents.deleteSessionFile(agentName, session.agent_session_id, remoteFilePath1);

      console.log(`Deleting session file at path: ${remoteFilePath2}...`);
      await project.agents.deleteSessionFile(agentName, session.agent_session_id, remoteFilePath2);
    } finally {
      await project.agents.deleteSession(agentName, session.agent_session_id);
      console.log(`Session deleted (id: ${session.agent_session_id})`);
    }
  } finally {
    await project.agents.deleteVersion(agentName, createdVersion, { force: true });
    console.log(`Agent version ${createdVersion} deleted.`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
