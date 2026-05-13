// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to stream hosted agent session logs
 * using `project.beta.agents.getSessionLogStream` with the
 * AIProjectClient.
 *
 * Sessions only work with Hosted Agents.
 *
 * Session and log stream operations are currently preview features.
 * In the JS SDK, you access these operations via `project.beta.agents`.
 *
 * @summary Demonstrates streaming session logs from a hosted agent.
 *
 * @azsdk-weight 90
 */

import type {
  AgentEndpointConfig,
  FixedRatioVersionSelectionRule,
  HostedAgentDefinition,
  ProtocolVersionRecord,
  VersionRefIndicator,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const image = process.env["FOUNDRY_AGENT_CONTAINER_IMAGE"] || "<agent image>";
const agentName = "MySessionLogStreamAgent";

interface SseFrame {
  event: string | undefined;
  data: string;
}

function closeReadableStream(stream: NodeJS.ReadableStream): void {
  stream.pause();
  if ("destroy" in stream && typeof stream.destroy === "function") {
    stream.destroy();
  }
}

function iterSseFrames(stream: NodeJS.ReadableStream, maxLogEvents: number): Promise<SseFrame[]> {
  return new Promise((resolve, reject) => {
    const frames: SseFrame[] = [];
    let buffer = "";

    stream.on("data", (chunk: Buffer) => {
      buffer += chunk.toString("utf-8");

      while (buffer.includes("\n\n")) {
        const idx = buffer.indexOf("\n\n");
        const frame = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);

        let eventName: string | undefined;
        const dataLines: string[] = [];

        for (const line of frame.split("\n")) {
          if (line.startsWith("event: ")) {
            eventName = line.slice(7);
          } else if (line.startsWith("data: ")) {
            dataLines.push(line.slice(6));
          }
        }

        if (dataLines.length > 0 || eventName) {
          frames.push({ event: eventName, data: dataLines.join("\n") });
          if (frames.length >= maxLogEvents) {
            closeReadableStream(stream);
            resolve(frames);
            return;
          }
        }
      }
    });

    stream.on("end", () => resolve(frames));
    stream.on("error", reject);
  });
}

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
        { protocol: "responses", version: "1.0.0" } as ProtocolVersionRecord,
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
  const session = await project.beta.agents.createSession(agentName, versionIndicator);
  console.log(`Session created (id: ${session.agent_session_id}, status: ${session.status})`);

  try {
    // ── Configure agent endpoint for responses protocol ─────────────────
    const endpointConfig: AgentEndpointConfig = {
      version_selector: {
        version_selection_rules: [
          {
            type: "FixedRatio",
            agent_version: agent.version,
            traffic_percentage: 100,
          } as FixedRatioVersionSelectionRule,
        ],
      },
      protocols: ["responses"],
    };

    await project.beta.agents.updateAgent(agentName, {
      agentEndpoint: endpointConfig,
    });
    console.log(`Agent endpoint configured for agent: ${agentName}`);

    // ── Create an OpenAI client bound to the agent endpoint ─────────────
    const openAIClient = project.getOpenAIClient({
      azureConfig: { allowPreview: true, agentName },
    });

    // ── Call Responses API bound to the agent session ───────────────────
    console.log("\nGenerating response...");
    const response = await openAIClient.responses.create(
      {
        input: "Say hello in one short sentence.",
      },
      {
        body: { agent_session_id: session.agent_session_id },
      },
    );
    console.log(`Response output: ${response.output_text}`);

    // ── Stream session logs ─────────────────────────────────────────────
    await new Promise((resolve) => setTimeout(resolve, 2_000));

    console.log("\nStreaming session logs...");
    const logStream = await project.beta.agents.getSessionLogStream(
      agentName,
      agent.version,
      session.agent_session_id,
    );

    if (logStream.readableStreamBody) {
      const frames = await iterSseFrames(logStream.readableStreamBody, 30);
      for (const frame of frames) {
        console.log(`SSE event: ${frame.event}`);
        console.log(`SSE data: ${frame.data}\n`);
      }
    }
  } finally {
    // ── Cleanup ─────────────────────────────────────────────────────────
    console.log("\nCleaning up resources...");

    await project.beta.agents.deleteSession(agentName, session.agent_session_id);
    console.log(`Session deleted (id: ${session.agent_session_id})`);

    await project.agents.deleteVersion(agentName, agent.version);
    console.log(`Agent version ${agent.version} deleted.`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
