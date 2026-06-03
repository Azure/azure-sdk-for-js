// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to add the subscriptions that should be monitored by the Dynatrace monitor resource.
 *
 * @summary add the subscriptions that should be monitored by the Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/MonitoredSubscriptions_CreateOrUpdate.json
 */
async function monitorsAddMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.createOrUpdate("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsAddMonitoredSubscriptions();
}

main().catch(console.error);
