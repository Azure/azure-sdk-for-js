// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates basic CRUD operations for routines using
 * the AIProjectClient.
 *
 * 1) Create or update a routine with a schedule trigger and an agent action.
 * 2) Retrieve the routine.
 * 3) List all routines.
 * 4) Disable and re-enable the routine.
 * 5) Delete the routine.
 *
 * Routines are a preview feature. In the JS SDK, you access
 * these operations via `project.beta.routines`.
 *
 * @summary Demonstrates routine CRUD operations.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["DEPLOYMENT_NAME"] || "gpt-4o";
const routineName = "sample-routine";
const agentName = "routine-sample-agent";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Create a prompt agent to use with the routine
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that summarizes daily tasks.",
  });
  console.log(`Agent created: ${agent.name} (version: ${agent.version})`);

  // Create or update a routine
  const routine = await project.beta.routines.createOrUpdate(
    routineName,
    { daily: { type: "schedule", cron_expression: "0 9 * * *", time_zone: "UTC" } },
    { type: "invoke_agent_responses_api", agent_name: agentName },
    {
      description: "A routine that invokes an agent daily at 9 AM.",
    },
  );
  console.log(`Routine created: ${routine.name}`);

  // Retrieve the routine
  const fetched = await project.beta.routines.get(routineName);
  console.log(`Retrieved routine: ${fetched.name} (enabled: ${fetched.enabled})`);

  // List all routines
  console.log("Listing routines:");
  for await (const r of project.beta.routines.list()) {
    console.log(`  - ${r.name}`);
  }

  // Disable the routine
  const disabled = await project.beta.routines.disable(routineName);
  console.log(`Routine disabled: ${disabled.name} (enabled: ${disabled.enabled})`);

  // Re-enable the routine
  const enabled = await project.beta.routines.enable(routineName);
  console.log(`Routine enabled: ${enabled.name} (enabled: ${enabled.enabled})`);

  // Delete the routine
  await project.beta.routines.delete(routineName);
  console.log(`Routine deleted: ${routineName}`);

  // Clean up the agent
  await project.agents.delete(agentName);
  console.log(`Agent deleted: ${agentName}`);
}

main().catch(console.error);
