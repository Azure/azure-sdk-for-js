// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 *
 * @summary lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListMonitoredResources_MaximumSet_Gen.json
 */
async function monitorsListMonitoredResourcesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 *
 * @summary lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListMonitoredResources_MinimumSet_Gen.json
 */
async function monitorsListMonitoredResourcesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources(
    "rgopenapi",
    "ipxmlcbonyxtolzejcjshkmlron",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListMonitoredResourcesMaximumSetGen();
  await monitorsListMonitoredResourcesMinimumSetGen();
}

main().catch(console.error);
