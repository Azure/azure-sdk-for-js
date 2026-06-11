// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list MonitoredSubscriptionProperties resources by NewRelicMonitorResource
 *
 * @summary list MonitoredSubscriptionProperties resources by NewRelicMonitorResource
 * x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_List.json
 */
async function monitorsGetMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
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
