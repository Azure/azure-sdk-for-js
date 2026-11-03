// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get detailed information about all subscriptions currently being monitored by the Elastic monitor resource.
 *
 * @summary get detailed information about all subscriptions currently being monitored by the Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Get.json
 */
async function monitorsGetMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main() {
  await monitorsGetMonitoredSubscriptions();
}

main().catch(console.error);
