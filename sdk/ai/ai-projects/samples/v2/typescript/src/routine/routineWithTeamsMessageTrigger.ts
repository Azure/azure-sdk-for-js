// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine that fires when a new
 * Microsoft Teams channel message arrives, then poll the run history to observe
 * the resulting runs.
 *
 * The routine is bound to an existing hosted agent and configured with a
 * `CustomRoutineTrigger`. The trigger uses a Teams-compatible custom connection
 * and listens for the `on_new_channel_message` event on a specific Teams
 * channel. After creating the routine, post a message to the configured channel
 * to fire it.
 *
 * Routines are a preview feature. In the JS SDK, you access these operations
 * via `project.beta.routines`.
 *
 * @summary Demonstrates a routine with a Teams channel message trigger.
 */

import type {
  CustomRoutineTrigger,
  InvokeAgentResponsesApiRoutineAction,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";
const teamsConnectionName = process.env["TEAMS_CONNECTION_NAME"] || "teams-conn";
const teamsChannelUrl = process.env["TEAMS_CHANNEL_URL"] || "<teams channel url>";
const pollIntervalSeconds = Number(process.env["POLL_INTERVAL_SECONDS"] || "10");

const routineName = "sample-routine-teams-channel-message";

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
  console.log({ group_id: teamsGroupId, channel_id: teamsChannelId });

  // Clean up any leftover routine from a prior run
  try {
    await project.beta.routines.delete(routineName);
  } catch {
    // ignore 404
  }

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

  try {
    // Poll run history until a terminal state is reached or timeout
    console.log("Waiting for a routine run for up to 10 minutes...");
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
}

main().catch(console.error);
