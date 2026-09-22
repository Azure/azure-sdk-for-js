// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of a long running azure asynchronous operation.
 *
 * @summary get the status of a long running azure asynchronous operation.
 * x-ms-original-file: 2025-07-01/OperationStatusesGet.json
 */
async function getSpecificOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.operationStatuses.get(
    "West US",
    "713192d7-503f-477a-9cfe-4efc3ee2bd11",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSpecificOperationStatus();
}

main().catch(console.error);
