// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitoragents";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists observability agents in the specified resource group.
 *
 * @summary lists observability agents in the specified resource group.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_ListByResourceGroup.json
 */
async function observabilityAgentsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.observabilityAgents.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await observabilityAgentsListByResourceGroup();
}

main().catch(console.error);
