// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Failover Instances
 *
 * @summary list Failover Instances
 * x-ms-original-file: 2026-07-01-preview/FailoverInstances_ListByScheduler_MaximumSet_Gen.json
 */
async function failoverInstancesListBySchedulerMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.failoverInstances.listByScheduler(
    "rgdurabletask",
    "testscheduler",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await failoverInstancesListBySchedulerMaximumSet();
}

main().catch(console.error);
