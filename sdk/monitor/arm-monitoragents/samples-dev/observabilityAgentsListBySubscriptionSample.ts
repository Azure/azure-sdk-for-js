// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitoragents";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists observability agents in the specified subscription.
 *
 * @summary lists observability agents in the specified subscription.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_ListBySubscription.json
 */
async function observabilityAgentsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.observabilityAgents.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await observabilityAgentsListBySubscription();
}

main().catch(console.error);
