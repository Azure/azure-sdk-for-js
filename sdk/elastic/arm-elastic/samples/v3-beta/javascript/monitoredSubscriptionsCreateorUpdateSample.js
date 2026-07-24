// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring.
 *
 * @summary add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring.
 * x-ms-original-file: 2025-06-01/MonitoredSubscriptions_CreateorUpdate.json
 */
async function monitorsAddMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.createorUpdate(
    "myResourceGroup",
    "myMonitor",
    "default",
  );
  console.log(result);
}

async function main() {
  await monitorsAddMonitoredSubscriptions();
}

main().catch(console.error);
