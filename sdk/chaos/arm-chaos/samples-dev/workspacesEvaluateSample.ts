// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers scenario evaluation for the workspace.
 *
 * @summary triggers scenario evaluation for the workspace.
 * x-ms-original-file: 2026-08-01-preview/Workspaces_Evaluate.json
 */
async function triggerScenarioEvaluationForTheWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.evaluate("exampleRG", "exampleWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await triggerScenarioEvaluationForTheWorkspace();
}

main().catch(console.error);
