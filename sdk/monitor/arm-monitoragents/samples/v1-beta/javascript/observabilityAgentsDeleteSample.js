// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitoragents");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an observability agent.
 *
 * @summary deletes an observability agent.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_Delete.json
 */
async function observabilityAgentsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  await client.observabilityAgents.delete("myResourceGroup", "myObservabilityAgent");
}

async function main() {
  await observabilityAgentsDelete();
}

main().catch(console.error);
