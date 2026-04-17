// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform session and session-file operations
 * on beta agents using the AIProjectClient.
 *
 * Beta agent sessions are currently a preview feature. In the JS SDK, you
 * access these operations via `project.beta.agents`.
 *
 * @summary Demonstrates session CRUD and session file operations using the beta agents API.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");
const { buffer } = require("node:stream/consumers");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const image = process.env["FOUNDRY_AGENT_CONTAINER_IMAGE"] || "<agent image>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const agentName = "MyBetaAgentsSampleWithHostedAgent13";

  // ── Create a hosted agent version ─────────────────────────────────────

  console.log("Creating agent...");
  const agent = await project.agents.createVersion(
    agentName,
    {
      kind: "hosted",
      cpu: "0.5",
      memory: "1Gi",
      image,
      container_protocol_versions: [{ protocol: "responses", version: "v1" }],
    },
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

  const isolationKey = "sample-isolation-key-13";

  // ── Session CRUD ──────────────────────────────────────────────────────

  // Create a session
  const versionIndicator = {
    type: "version_ref",
    agent_version: agent.version,
  };
  const session = await project.beta.agents.createSession(
    agentName,
    isolationKey,
    versionIndicator,
  );
  console.log(`Session created (id: ${session.agent_session_id}, status: ${session.status})`);

  // Retrieve the session
  const fetched = await project.beta.agents.getSession(agentName, session.agent_session_id);
  console.log(`Retrieved session (id: ${fetched.agent_session_id}, status: ${fetched.status})`);

  // List sessions
  const sessions = [];
  for await (const item of project.beta.agents.listSessions(agentName, { limit: 10 })) {
    sessions.push(item);
  }
  console.log(`Found ${sessions.length} session(s)`);
  for (const item of sessions) {
    console.log(`  - ${item.agent_session_id} (status: ${item.status})`);
  }

  // ── Session File operations ───────────────────────────────────────────

  // Upload a file to the session sandbox
  const filePath = "/sandbox/hello.txt";
  const fileContent = new TextEncoder().encode("Hello from the beta agents sample!");
  const uploadResult = await project.beta.agents.uploadSessionFile(
    agentName,
    session.agent_session_id,
    filePath,
    fileContent,
  );
  console.log(`Uploaded file: ${uploadResult.path} (${uploadResult.bytes_written} bytes)`);

  // List files in the session sandbox
  const listing = await project.beta.agents.listSessionFiles(
    agentName,
    session.agent_session_id,
    "/sandbox",
  );
  console.log(`Files in /sandbox:`);
  for (const entry of listing.entries) {
    console.log(
      `  - ${entry.name} (${entry.is_directory ? "directory" : "file"})`,
      JSON.stringify(entry),
    );
  }

  // Download the file back
  const downloadResult = await project.beta.agents.downloadSessionFile(
    agentName,
    session.agent_session_id,
    uploadResult.path,
  );

  console.log(
    `Downloaded file (has content: ${downloadResult.blobBody !== undefined || downloadResult.readableStreamBody !== undefined})`,
  );

  const nodejsDownloadedContent = downloadResult.readableStreamBody
    ? new Uint8Array(await buffer(downloadResult.readableStreamBody))
    : undefined;

  const browserDownloadedContent = downloadResult.blobBody
    ? new Uint8Array(await (await downloadResult.blobBody).arrayBuffer())
    : undefined;

  const downloadedContent = nodejsDownloadedContent ?? browserDownloadedContent;

  console.log(`Downloaded file content: ${new TextDecoder().decode(downloadedContent)}`);

  // Delete the file
  await project.beta.agents.deleteSessionFile(agentName, session.agent_session_id, filePath);
  console.log(`Deleted file: ${filePath}`);

  // ── Cleanup ───────────────────────────────────────────────────────────

  // Delete the session
  await project.beta.agents.deleteSession(agentName, session.agent_session_id, isolationKey);
  console.log("Session deleted");

  // Delete the agent version
  await project.agents.deleteVersion(agentName, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
