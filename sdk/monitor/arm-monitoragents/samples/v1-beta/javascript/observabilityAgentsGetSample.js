// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitoragents");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the specified observability agent.
 *
 * @summary returns the specified observability agent.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_Get.json
 */
async function observabilityAgentsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.observabilityAgents.get("myResourceGroup", "myObservabilityAgent");
  console.log(result);
}

async function main() {
  await observabilityAgentsGet();
}

main().catch(console.error);
