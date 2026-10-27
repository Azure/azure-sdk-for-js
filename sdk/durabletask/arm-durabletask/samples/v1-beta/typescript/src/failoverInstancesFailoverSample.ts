// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to trigger a graceful failover for the parent scheduler
 *
 * @summary trigger a graceful failover for the parent scheduler
 * x-ms-original-file: 2026-07-01-preview/FailoverInstances_Failover.json
 */
async function failoverInstancesFailover(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.failoverInstances.failover("rgdurabletask", "testscheduler");
  console.log(result);
}

async function main(): Promise<void> {
  await failoverInstancesFailover();
}

main().catch(console.error);
