// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 *
 * @summary Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_LatestLinkedSaaS_MaximumSet_Gen.json
 */
async function monitorsLatestLinkedSaaSMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.latestLinkedSaaS(resourceGroupName, monitorName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 *
 * @summary Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_LatestLinkedSaaS_MinimumSet_Gen.json
 */
async function monitorsLatestLinkedSaaSMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.latestLinkedSaaS(resourceGroupName, monitorName);
  console.log(result);
}

async function main() {
  await monitorsLatestLinkedSaaSMaximumSetGen();
  await monitorsLatestLinkedSaaSMinimumSetGen();
}

main().catch(console.error);
