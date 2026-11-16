// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Failover Instance
 *
 * @summary delete a Failover Instance
 * x-ms-original-file: 2026-07-01-preview/FailoverInstances_Delete_MaximumSet_Gen.json
 */
async function failoverInstancesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.failoverInstances.delete("rgdurabletask", "testscheduler");
}

async function main(): Promise<void> {
  await failoverInstancesDeleteMaximumSet();
}

main().catch(console.error);
