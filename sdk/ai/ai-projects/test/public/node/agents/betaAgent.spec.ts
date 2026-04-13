// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type {
  AgentsOperations,
  AIProjectClient,
  BetaAgentsOperations,
  HostedAgentDefinition,
  ProtocolVersionRecord,
  VersionRefIndicator,
} from "../../../../src/index.js";
import { buffer } from "node:stream/consumers";

const agentName = "beta-agent-test";
const image = process.env["FOUNDRY_AGENT_CONTAINER_IMAGE"] || "<agent image>";

describe("beta agents - session CRUD and file operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;
  let betaAgents: BetaAgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
    betaAgents = projectsClient.beta.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create session, manage files, and clean up", async function () {
    // Create a hosted agent version
    const agent = await agents.createVersion(
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
    assert.isNotNull(agent);
    assert.isNotNull(agent.name);
    assert.isNotNull(agent.version);
    console.log(`Agent created (name: ${agent.name}, version: ${agent.version})`);

    // Poll until agent version is active
    for (let attempt = 0; attempt < 60; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 3_000));
      const versionDetails = await agents.getVersion(agentName, agent.version);
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

    const isolationKey = "test-isolation-key";

    // Create a session
    const versionIndicator: VersionRefIndicator = {
      type: "version_ref",
      agent_version: agent.version,
    };
    const session = await betaAgents.createSession(agentName, isolationKey, versionIndicator);
    assert.isNotNull(session);
    assert.isNotNull(session.agent_session_id);
    assert.isNotNull(session.status);
    console.log(`Session created (id: ${session.agent_session_id}, status: ${session.status})`);

    // Retrieve the session
    const fetched = await betaAgents.getSession(agentName, session.agent_session_id);
    assert.isNotNull(fetched);
    assert.equal(fetched.agent_session_id, session.agent_session_id);
    console.log(`Retrieved session (id: ${fetched.agent_session_id}, status: ${fetched.status})`);

    // List sessions
    const sessions = [];
    for await (const item of betaAgents.listSessions(agentName, { limit: 10 })) {
      sessions.push(item);
    }
    assert.isTrue(sessions.length >= 1);
    console.log(`Found ${sessions.length} session(s)`);

    // Upload a file to the session sandbox
    const filePath = "/sandbox/hello.txt";
    const fileContent = new TextEncoder().encode("Hello from the beta agents test!");
    const uploadResult = await betaAgents.uploadSessionFile(
      agentName,
      session.agent_session_id,
      filePath,
      fileContent,
    );
    assert.isNotNull(uploadResult);
    assert.isNotNull(uploadResult.path);
    assert.isTrue(uploadResult.bytes_written > 0);
    console.log(`Uploaded file: ${uploadResult.path} (${uploadResult.bytes_written} bytes)`);

    // List files in the session sandbox
    const listing = await betaAgents.listSessionFiles(
      agentName,
      session.agent_session_id,
      "/sandbox",
    );
    assert.isNotNull(listing);
    assert.isArray(listing.entries);
    assert.isTrue(listing.entries.length >= 1);
    console.log(`Files in /sandbox: ${listing.entries.map((e) => e.name).join(", ")}`);

    // Download the file back
    const downloadResult = await betaAgents.downloadSessionFile(
      agentName,
      session.agent_session_id,
      uploadResult.path,
    );
    assert.isNotNull(downloadResult);
    assert.isTrue(
      downloadResult.readableStreamBody !== undefined || downloadResult.blobBody !== undefined,
      "Expected either readableStreamBody or blobBody",
    );

    // Verify content
    if (downloadResult.readableStreamBody) {
      const downloaded = new Uint8Array(await buffer(downloadResult.readableStreamBody));
      const text = new TextDecoder().decode(downloaded);
      assert.equal(text, "Hello from the beta agents test!");
      console.log(`Downloaded file content: ${text}`);
    }

    // Delete the file
    await betaAgents.deleteSessionFile(agentName, session.agent_session_id, filePath);
    console.log(`Deleted file: ${filePath}`);

    // Delete the session
    await betaAgents.deleteSession(agentName, session.agent_session_id, isolationKey);
    console.log("Session deleted");

    // Delete the agent version
    await agents.deleteVersion(agentName, agent.version);
    console.log("Agent deleted");
  }, 300_000);
});
