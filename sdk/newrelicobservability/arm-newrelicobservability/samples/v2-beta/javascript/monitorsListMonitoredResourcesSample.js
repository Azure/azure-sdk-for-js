// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 *
 * @summary Lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_ListMonitoredResources_MaximumSet_Gen.json
 */
async function monitorsListMonitoredResourcesMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources(resourceGroupName, monitorName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 *
 * @summary Lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_ListMonitoredResources_MinimumSet_Gen.json
 */
async function monitorsListMonitoredResourcesMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listMonitoredResources(resourceGroupName, monitorName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await monitorsListMonitoredResourcesMaximumSetGen();
  await monitorsListMonitoredResourcesMinimumSetGen();
}

main().catch(console.error);
