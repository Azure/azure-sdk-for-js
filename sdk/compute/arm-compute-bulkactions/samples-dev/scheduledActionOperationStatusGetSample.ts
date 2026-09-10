// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of the specified scheduled action operation.
 *
 * @summary gets the status of the specified scheduled action operation.
 * x-ms-original-file: 2026-08-06-preview/ScheduledActionOperationStatus_Get_MaximumSet_Gen.json
 */
async function getScheduledActionOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.scheduledActionOperationStatus.get(
    "eastus",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getScheduledActionOperationStatus();
}

main().catch(console.error);
