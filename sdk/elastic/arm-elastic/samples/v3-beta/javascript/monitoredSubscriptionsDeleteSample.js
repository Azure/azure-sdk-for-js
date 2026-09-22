// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities.
 *
 * @summary delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities.
 * x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Delete.json
 */
async function monitorsDeleteMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.monitoredSubscriptions.delete("myResourceGroup", "myMonitor", "default");
}

async function main() {
  await monitorsDeleteMonitoredSubscriptions();
}

main().catch(console.error);
