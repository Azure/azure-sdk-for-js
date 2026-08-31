// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine that fires when a new
 * Microsoft Teams channel message arrives, then poll the run history to observe
 * the resulting runs.
 *
 * The sample uploads the basic hosted-agent code from
 * `assets/responses-echo-agent.zip` as a temporary hosted-agent version,
 * routes the configured hosted agent name to that version, and creates a
 * routine configured with a `CustomRoutineTrigger`. The trigger uses a
 * Teams-compatible custom connection and listens for the
 * `on_new_channel_message` event on a specific Teams channel. After creating
 * the routine, post a message to the configured channel to fire it.
 *
 * Routines are a preview feature. In the JS SDK, you access these operations
 * via `project.beta.routines`.
 *
 * @summary Demonstrates a routine with a Teams channel message trigger.
 */

import type {
  CustomRoutineTrigger,
  InvokeAgentResponsesApiRoutineAction,
  CreateAgentVersionFromCodeContent,
  HostedAgentDefinition,
  CodeDependencyResolution,
  AgentEndpointConfig,
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
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "MyHostedAgent";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model name>";
const teamsConnectionName = process.env["TEAMS_CONNECTION_NAME"] || "teams-conn";
const teamsChannelUrl = process.env["TEAMS_CHANNEL_URL"] || "<teams channel url>";
const pollIntervalSeconds = Number(process.env["POLL_INTERVAL_SECONDS"] || "10");
const useRemoteBuild =
  (process.env["FOUNDRY_HOSTED_AGENT_REMOTE_BUILD"] || "true").trim().toLowerCase() === "true";

const codeZipPath = path.resolve(__dirname, "../assets/responses-echo-agent.zip");
const routineName = "sample-routine-teams-channel-message";

function sha256Hex(data: Uint8Array): string {
  return createHash("sha256").update(data).digest("hex");
}

// Derive groupId and channelId from a Teams channel URL like:
// https://teams.microsoft.com/l/channel/<channel_id>/<channel_name>?groupId=<group_id>&tenantId=<tenant_id>
function parseTeamsChannelUrl(channelUrl: string): {
  groupId: string | null;
  channelId: string | null;
} {
  const parsed = new URL(channelUrl);
  const pathParts = parsed.pathname.split("/").filter(Boolean);

  let channelId: string | null = null;
  if (pathParts.length >= 3 && pathParts[0] === "l" && pathParts[1] === "channel") {
    channelId = decodeURIComponent(pathParts[2]);
  }

  const groupId = parsed.searchParams.get("groupId");
  return { groupId, channelId };
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const { groupId: teamsGroupId, channelId: teamsChannelId } =
    parseTeamsChannelUrl(teamsChannelUrl);

  console.log(`Preparing routine \`${routineName}\` for Teams channel ${teamsChannelId}.`);
  console.log(`Using Teams channel URL: ${teamsChannelUrl}`);
  console.log({ group_id: teamsGroupId, channel_id: teamsChannelId });

  const dependencyResolution: CodeDependencyResolution = useRemoteBuild
    ? "remote_build"
    : "bundled";

  // ── Upload a temporary hosted agent version ───────────────────────────
  const codeZip = readFileSync(codeZipPath);
  const codeZipSha256 = sha256Hex(codeZip);

  const definition: HostedAgentDefinition = {
    kind: "hosted",
    cpu: "0.5",
    memory: "1Gi",
    protocol_versions: [
      { protocol: "responses", version: "2.0.0" },
      { protocol: "invocations", version: "2.0.0" },
    ],
    code_configuration: {
      runtime: "python_3_14",
      entry_point: ["python", "main.py"],
      dependency_resolution: dependencyResolution,
    },
    environment_variables: {
      FOUNDRY_PROJECT_ENDPOINT: projectEndpoint,
      FOUNDRY_MODEL_NAME: modelName,
    },
  };

  console.log(
    `Creating code-based agent version (dependency_resolution=${dependencyResolution})...`,
  );
  const content: CreateAgentVersionFromCodeContent = {
    metadata: {
      description: "Teams channel routine sample hosted agent uploaded from assets.",
      definition,
      metadata: { enableVnextExperience: "true" },
    },
    code: { contents: codeZip, contentType: "application/zip", filename: "code.zip" },
  };

  const created = await project.agents.createVersionFromCode(agentName, codeZipSha256, content);
  const createdVersion = created.version;
  console.log(`Created code-based hosted agent version: ${createdVersion}`);

  let originalAgentEndpoint: AgentEndpointConfig | undefined;

  try {
    // ── Poll until agent version is active ────────────────────────────
    for (let attempt = 0; attempt < 60; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
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

    // ── Point agent endpoint at the new version ───────────────────────
    const agent = await project.agents.get(agentName);
    originalAgentEndpoint = agent.agent_endpoint;

    await project.agents.updateAgent(agentName, {
      agentEndpoint: {
        version_selector: {
          version_selection_rules: [
            { agent_version: createdVersion, traffic_percentage: 100 },
          ],
        },
        protocol_configuration: {
          responses: {},
        },
      },
    });
    console.log(`Agent endpoint configured for version ${createdVersion}`);

    // ── Clean up any leftover routine from a prior run ────────────────
    try {
      await project.beta.routines.delete(routineName);
    } catch {
      // ignore 404
    }

    console.log(`Creating routine \`${routineName}\`.`);
    const routine = await project.beta.routines.createOrUpdate(routineName, {
      description: "Routine used by the Teams channel message trigger sample.",
      enabled: true,
      triggers: {
        incoming: {
          type: "custom",
          provider: "teams",
          event_name: "on_new_channel_message",
          parameters: {
            connection_id: teamsConnectionName,
            thread_type: "channel",
            group_id: teamsGroupId,
            channel_id: teamsChannelId,
          },
        } as CustomRoutineTrigger,
      },
      action: {
        type: "invoke_agent_responses_api",
        agent_name: agentName,
      } as InvokeAgentResponsesApiRoutineAction,
    });
    console.log(
      `Created routine: ${routine.name} enabled=${routine.enabled} ` +
        `provider=teams event_name=on_new_channel_message group_id=${teamsGroupId}`,
    );
    console.log("Post a new message to the configured Teams channel to fire the routine.");
    console.log("Waiting for a routine run for up to 10 minutes...");

    try {
      const terminalStatuses = new Set(["finished", "failed", "killed"]);
      const seenPhases = new Map<string, string>();
      const deadline = Date.now() + 600_000;
      let finished = false;
      let runObserved = false;

      while (Date.now() < deadline && !finished) {
        await new Promise((resolve) => setTimeout(resolve, pollIntervalSeconds * 1000));
        for await (const run of project.beta.routines.listRuns(routineName, {
          limit: 20,
          order: "desc",
        })) {
          runObserved = true;
          const currentPhase = String(run.phase);
          if (seenPhases.get(run.id) === currentPhase) {
            continue;
          }
          seenPhases.set(run.id, currentPhase);
          console.log(
            `  run_id=${run.id} phase=${run.phase} status=${run.status} ` +
              `trigger_type=${run.trigger_type} triggered_at=${run.triggered_at} ended_at=${run.ended_at}`,
          );
          if (run.status && terminalStatuses.has(run.status.toLowerCase())) {
            finished = true;
            console.log(`The response Id is ${(run as Record<string, unknown>).response_id}`);
          }
        }
      }

      if (!finished && runObserved) {
        console.log(
          "A routine run was observed, but no terminal run state was reached within the deadline.",
        );
      } else if (!runObserved) {
        console.log("No Teams-triggered run was observed within the deadline.");
      }
    } finally {
      // Clean up
      await project.beta.routines.delete(routineName);
      console.log("Routine deleted");
    }
  } finally {
    // ── Restore original agent endpoint and delete the version ─────────
    if (originalAgentEndpoint) {
      await project.agents.updateAgent(agentName, {
        agentEndpoint: originalAgentEndpoint,
      });
      console.log("Agent endpoint restored");
    }

    await project.agents.deleteVersion(agentName, createdVersion, { force: true });
    console.log(`Hosted agent version ${createdVersion} deleted`);
  }
}

main().catch(console.error);
