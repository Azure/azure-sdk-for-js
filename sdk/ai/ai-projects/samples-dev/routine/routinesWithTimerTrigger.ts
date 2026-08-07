// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a routine that fires automatically
 * from a one-shot timer trigger, then record the resulting runs by polling
 * `listRuns(...)` using the AIProjectClient.
 *
 * The routine is bound to an existing hosted agent and scheduled to fire a
 * short time in the future. The sample then polls the run history until a
 * terminal phase is reached (or a deadline elapses), printing each observed
 * transition. The routine is deleted at the end of the sample.
 *
 * Telemetry produced by the routine run is exported both to the console and to
 * the Application Insights resource attached to the Foundry project (viewable in
 * the "Tracing" tab on ai.azure.com).
 *
 * Routines are a preview feature. In the JS SDK, you access these operations
 * via `project.beta.routines`.
 *
 * @summary Demonstrates creating a timer-triggered routine and polling its runs.
 */

import type { RoutineRun, RoutineRunPhase } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { useAzureMonitor } from "@azure/monitor-opentelemetry";
import "dotenv/config";

const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";

const routineName = "sample-routine-timer";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // Send spans to the Application Insights resource attached to the Foundry
  // project. The same spans are viewable in the "Tracing" tab on ai.azure.com.
  const connectionString = await project.telemetry.getApplicationInsightsConnectionString();
  useAzureMonitor({ azureMonitorExporterOptions: { connectionString } });

  // Clean up any leftover routine from a previous run.
  try {
    await project.beta.routines.delete(routineName);
    console.log(`Routine \`${routineName}\` deleted`);
  } catch (error: any) {
    if (error.statusCode !== 404) {
      throw error;
    }
  }

  // Schedule the routine to fire a short time in the future.
  const fireAt = new Date(Date.now() + 20_000);
  const created = await project.beta.routines.createOrUpdate(routineName, {
    description: "Routine used by the timer-trigger sample.",
    enabled: true,
    triggers: {
      once: { type: "timer", at: fireAt },
    },
    action: { type: "invoke_agent_responses_api", agent_name: agentName },
  });
  console.log(
    `Created routine: ${created.name} enabled=${created.enabled} fire_at=${fireAt.toISOString()}`,
  );

  // Poll the run history until a terminal run appears or the deadline elapses.
  const seenPhases = new Map<string, RoutineRunPhase | undefined>();
  let finalRun: RoutineRun | undefined;

  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    for await (const run of project.beta.routines.listRuns(routineName, {
      limit: 20,
      order: "desc",
    })) {
      if (!run.id) {
        continue;
      }
      if (seenPhases.get(run.id) === run.phase) {
        continue;
      }
      seenPhases.set(run.id, run.phase);
      console.log(
        `  - run_id=${run.id} phase=${run.phase} status=${run.status} ` +
          `trigger_type=${run.trigger_type} triggered_at=${run.triggered_at} ended_at=${run.ended_at}`,
      );
      if (run.status?.toLowerCase() === "finished") {
        finalRun = run;
      }
    }

    if (finalRun) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }

  if (finalRun) {
    console.log("Final run:");
    console.log(JSON.stringify(finalRun, null, 2));
    // Note: retrieving the response body produced by a routine-dispatched run
    // via `openaiClient.responses.retrieve(finalRun.response_id)` is not yet
    // supported by the service for this scenario.
  } else {
    console.log("Timer did not produce a terminal run within the deadline.");
  }

  await project.beta.routines.delete(routineName);
  console.log("Routine deleted");
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
