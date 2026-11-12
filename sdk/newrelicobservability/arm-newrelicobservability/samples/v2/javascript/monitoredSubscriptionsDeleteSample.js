// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a MonitoredSubscriptionProperties
 *
 * @summary delete a MonitoredSubscriptionProperties
 * x-ms-original-file: 2026-06-01/MonitoredSubscriptions_Delete.json
 */
async function monitorsDeleteMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  await client.monitoredSubscriptions.delete("myResourceGroup", "myMonitor", "default");
}

async function main() {
  await monitorsDeleteMonitoredSubscriptions();
}

main().catch(console.error);
