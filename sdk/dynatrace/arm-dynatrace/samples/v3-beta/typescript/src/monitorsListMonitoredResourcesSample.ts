// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the resources currently being monitored by the Dynatrace monitor resource.
 *
 * @summary list the resources currently being monitored by the Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/Monitors_ListMonitoredResources_MaximumSet_Gen.json
 */
async function monitorsListMonitoredResourcesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
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
async function monitorsListMonitoredResourcesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListMonitoredResourcesMaximumSetGen();
  await monitorsListMonitoredResourcesMinimumSetGen();
}

main().catch(console.error);
