// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the subscriptions currently being monitored by the Datadog monitor resource.
 *
 * @summary list the subscriptions currently being monitored by the Datadog monitor resource.
 * x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_List.json
 */
async function monitorsGetMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitoredSubscriptions.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsGetMonitoredSubscriptions();
}

main().catch(console.error);
