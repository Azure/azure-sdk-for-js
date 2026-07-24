// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine that fires automatically
 * from a one-shot timer trigger, then poll the run history until a terminal
 * state is reached.
 *
 * The routine is bound to an existing hosted agent and scheduled to fire a
 * short time in the future.
 *
 * Routines are a preview feature. In the JS SDK, you access
 * these operations via `project.beta.routines`.
 *
 * @summary Demonstrates a routine with a one-shot timer trigger.
 */

import type { TimerRoutineTrigger, InvokeAgentResponsesApiRoutineAction } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";

const routineName = "sample-routine-timer";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Clean up any leftover routine from a prior run
  try {
    await project.beta.routines.delete(routineName);
  } catch {
    // ignore 404
  }

  // Schedule the routine to fire 20 seconds from now
  const fireAt = new Date(Date.now() + 20_000);

  const routine = await project.beta.routines.createOrUpdate(routineName, {
    description: "Routine used by the timer-trigger sample.",
    enabled: true,
    triggers: {
      once: {
        type: "timer",
        at: fireAt,
      } as TimerRoutineTrigger,
    },
    action: {
      type: "invoke_agent_responses_api",
      agent_name: agentName,
    } as InvokeAgentResponsesApiRoutineAction,
  });
  console.log(
    `Created routine: ${routine.name} enabled=${routine.enabled} fire_at=${fireAt.toISOString()}`,
  );

  // Poll run history until a terminal state is reached
  const deadline = Date.now() + 180_000;
  let finished = false;
  while (Date.now() < deadline && !finished) {
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    for await (const run of project.beta.routines.listRuns(routineName, {
      limit: 20,
      order: "desc",
    })) {
      console.log(
        `  run_id=${run.id} phase=${run.phase} status=${run.status} ` +
          `trigger_type=${run.trigger_type} triggered_at=${run.triggered_at} ended_at=${run.ended_at}`,
      );
      if (run.status?.toLowerCase() === "finished") {
        finished = true;
        break;
      }
    }
  }

  if (!finished) {
    console.log("Timer did not produce a terminal run within the deadline.");
  }

  // Clean up
  await project.beta.routines.delete(routineName);
  console.log("Routine deleted");
}

main().catch(console.error);
