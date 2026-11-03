// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the resources currently being monitored by the Dynatrace monitor resource.
 *
 * @summary list the resources currently being monitored by the Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/Monitors_ListMonitoredResources_MaximumSet_Gen.json
 */
async function monitorsListMonitoredResourcesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources("myResourceGroup", "myMonitor", {
    request: {
      monitoredResourceIds: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/monitors/myMonitor/listMonitoredResources",
      ],
    },
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list the resources currently being monitored by the Dynatrace monitor resource.
 *
 * @summary list the resources currently being monitored by the Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/Monitors_ListMonitoredResources_MinimumSet_Gen.json
 */
async function monitorsListMonitoredResourcesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await monitorsListMonitoredResourcesMaximumSetGen();
  await monitorsListMonitoredResourcesMinimumSetGen();
}

main().catch(console.error);
