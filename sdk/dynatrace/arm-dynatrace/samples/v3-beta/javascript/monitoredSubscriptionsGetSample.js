// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the subscriptions currently being monitored by the Dynatrace monitor resource.
 *
 * @summary list the subscriptions currently being monitored by the Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Get.json
 */
async function monitorsGetMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsGetMonitoredSubscriptions();
}

main().catch(console.error);
