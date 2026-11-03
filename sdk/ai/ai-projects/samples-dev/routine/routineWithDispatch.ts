// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Routine with a manual (custom)
 * trigger and fire it on demand via `dispatch(...)`, then poll the run
 * history until it reaches a terminal state.
 *
 * The routine is bound to an existing hosted agent. Because the trigger is
 * a `CustomRoutineTrigger`, the routine never fires on its own; the sample
 * explicitly invokes it with `project.beta.routines.dispatch(...)` passing
 * an `InvokeAgentResponsesApiDispatchPayload` carrying the input sent to
 * the agent.
 *
 * Routines are a preview feature. In the JS SDK, you access
 * these operations via `project.beta.routines`.
 *
 * @summary Demonstrates dispatching a routine on demand and polling runs.
 */

import type {
  CustomRoutineTrigger,
  InvokeAgentResponsesApiRoutineAction,
  InvokeAgentResponsesApiDispatchPayload,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentName = process.env["FOUNDRY_HOSTED_AGENT_NAME"] || "<hosted agent name>";

const routineName = "sample-routine-dispatch";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Clean up any leftover routine from a prior run
  try {
    await project.beta.routines.delete(routineName);
  } catch {
    // ignore 404
  }

  // Create a routine with a custom (manual) trigger
  const routine = await project.beta.routines.createOrUpdate(routineName, {
    description: "Routine used by the dispatch sample.",
    enabled: true,
    triggers: {
      manual: {
        type: "custom",
        provider: "sample-provider",
        event_name: "sample-event",
        parameters: {},
      } as CustomRoutineTrigger,
    },
    action: {
      type: "invoke_agent_responses_api",
      agent_name: agentName,
    } as InvokeAgentResponsesApiRoutineAction,
  });
  console.log(`Created routine: ${routine.name} enabled=${routine.enabled}`);

  // Dispatch the routine manually
  const dispatchResult = await project.beta.routines.dispatch(routineName, {
    payload: {
      type: "invoke_agent_responses_api",
      input: "Say hello from a manually dispatched routine.",
    } as InvokeAgentResponsesApiDispatchPayload,
  });
  console.log(
    `Dispatched routine: dispatch_id=${dispatchResult.dispatch_id} task_id=${dispatchResult.task_id}`,
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
          `trigger_type=${run.trigger_type} triggered_at=${run.triggered_at}`,
      );
      if (run.status?.toLowerCase() === "finished") {
        finished = true;
        break;
      }
    }
  }

  if (!finished) {
    console.log("Dispatch did not produce a terminal run within the deadline.");
  }

  // Clean up
  await project.beta.routines.delete(routineName);
  console.log("Routine deleted");
}

main().catch(console.error);
