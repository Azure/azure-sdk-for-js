// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine that fires on a
 * recurring cron schedule, then poll the run history to observe the
 * first fire.
 *
 * The routine is bound to an existing hosted agent and scheduled with a
 * `ScheduleRoutineTrigger` using a 5-field cron expression. The service
 * enforces a minimum interval of five minutes, so this sample polls for
 * up to ~6 minutes to catch the first fire.
 *
 * Routines are a preview feature. In the JS SDK, you access
 * these operations via `project.beta.routines`.
 *
 * @summary Demonstrates a routine with a recurring schedule trigger.
 */

import type {
  ScheduleRoutineTrigger,
  InvokeAgentResponsesApiRoutineAction,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";

const routineName = "sample-routine-schedule";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Clean up any leftover routine from a prior run
  try {
    await project.beta.routines.delete(routineName);
  } catch {
    // ignore 404
  }

  // Fire every 5 minutes (the service-enforced minimum interval) in UTC
  const routine = await project.beta.routines.createOrUpdate(routineName, {
    description: "Routine used by the schedule-trigger sample.",
    enabled: true,
    triggers: {
      recurring: {
        type: "schedule",
        cron_expression: "*/5 * * * *",
        time_zone: "UTC",
      } as ScheduleRoutineTrigger,
    },
    action: {
      type: "invoke_agent_responses_api",
      agent_name: agentName,
    } as InvokeAgentResponsesApiRoutineAction,
  });
  console.log(`Created routine: ${routine.name} enabled=${routine.enabled}`);

  // Poll run history until the first fire completes or timeout
  const pollInterval = 15_000;
  const deadline = Date.now() + 360_000; // 6 minutes
  let finished = false;
  console.log("Waiting for the first scheduled run (up to ~6 minutes)...");
  while (Date.now() < deadline && !finished) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
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
    console.log("Schedule did not produce a terminal run within the deadline.");
  }

  // Clean up
  await project.beta.routines.delete(routineName);
  console.log("Routine deleted");
}

main().catch(console.error);
