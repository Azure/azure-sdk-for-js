// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refreshes recommendation status for all scenarios in a given workspace.
 *
 * @summary refreshes recommendation status for all scenarios in a given workspace.
 * x-ms-original-file: 2026-05-01-preview/Workspaces_RefreshRecommendations.json
 */
async function refreshRecommendationsForAllScenariosInAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.refreshRecommendations("exampleRG", "exampleWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await refreshRecommendationsForAllScenariosInAWorkspace();
}

main().catch(console.error);
