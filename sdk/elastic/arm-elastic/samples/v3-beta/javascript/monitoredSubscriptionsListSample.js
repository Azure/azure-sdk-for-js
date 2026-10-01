// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all subscriptions currently being monitored by the Elastic monitor resource, helping you manage observability.
 *
 * @summary list all subscriptions currently being monitored by the Elastic monitor resource, helping you manage observability.
 * x-ms-original-file: 2025-06-01/MonitoredSubscriptions_List.json
 */
async function monitorsGetMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
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
