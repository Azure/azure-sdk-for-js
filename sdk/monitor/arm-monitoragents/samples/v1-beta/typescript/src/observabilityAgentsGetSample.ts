// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitoragents";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the specified observability agent.
 *
 * @summary returns the specified observability agent.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_Get.json
 */
async function observabilityAgentsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.observabilityAgents.get("myResourceGroup", "myObservabilityAgent");
  console.log(result);
}

async function main(): Promise<void> {
  await observabilityAgentsGet();
}

main().catch(console.error);
