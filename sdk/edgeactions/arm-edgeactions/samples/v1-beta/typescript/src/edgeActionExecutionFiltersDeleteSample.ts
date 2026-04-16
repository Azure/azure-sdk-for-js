// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a EdgeActionExecutionFilter
 *
 * @summary delete a EdgeActionExecutionFilter
 * x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Delete.json
 */
async function deleteEdgeActionExecutionFilters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  await client.edgeActionExecutionFilters.delete("testrg", "edgeAction1", "executionFilter1");
}

async function main(): Promise<void> {
  await deleteEdgeActionExecutionFilters();
}

main().catch(console.error);
