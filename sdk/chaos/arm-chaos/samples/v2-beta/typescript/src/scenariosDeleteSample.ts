// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a scenario.
 *
 * @summary delete a scenario.
 * x-ms-original-file: 2026-05-01-preview/Scenarios_Delete.json
 */
async function deleteAScenarioInAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.scenarios.delete("exampleRG", "exampleWorkspace", "myVMShutdownScenario");
}

async function main(): Promise<void> {
  await deleteAScenarioInAWorkspace();
}

main().catch(console.error);
