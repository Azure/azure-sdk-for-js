// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a EdgeActionExecutionFilter
 *
 * @summary get a EdgeActionExecutionFilter
 * x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Get.json
 */
async function getEdgeActionExecutionFilters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionExecutionFilters.get(
    "testrg",
    "edgeAction1",
    "executionFilter1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getEdgeActionExecutionFilters();
}

main().catch(console.error);
