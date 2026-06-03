// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the subscriptions that are being monitored by the Dynatrace monitor resource
 *
 * @summary updates the subscriptions that are being monitored by the Dynatrace monitor resource
 * x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Update.json
 */
async function monitorsUpdateMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.update("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsUpdateMonitoredSubscriptions();
}

main().catch(console.error);
