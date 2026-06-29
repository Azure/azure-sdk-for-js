// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the resources currently being monitored by the Datadog monitor resource.
 *
 * @summary list the resources currently being monitored by the Datadog monitor resource.
 * x-ms-original-file: 2025-12-26-preview/MonitoredResources_List.json
 */
async function monitorsListMonitoredResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListMonitoredResources();
}

main().catch(console.error);
