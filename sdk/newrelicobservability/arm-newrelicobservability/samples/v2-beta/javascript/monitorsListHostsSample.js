// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 *
 * @summary Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_ListHosts_MaximumSet_Gen.json
 */
async function monitorsListHostsMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const request = {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    vmIds: ["xzphvxvfmvjrnsgyns"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts(resourceGroupName, monitorName, request)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 *
 * @summary Lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_ListHosts_MinimumSet_Gen.json
 */
async function monitorsListHostsMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const request = {
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
    vmIds: ["xzphvxvfmvjrnsgyns"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listHosts(resourceGroupName, monitorName, request)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await monitorsListHostsMaximumSetGen();
  await monitorsListHostsMinimumSetGen();
}

main().catch(console.error);
