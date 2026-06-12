// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 *
 * @summary returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 * x-ms-original-file: 2025-05-01-preview/Monitors_LatestLinkedSaaS_MaximumSet_Gen.json
 */
async function monitorsLatestLinkedSaaSMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.latestLinkedSaaS("rgopenapi", "ipxmlcbonyxtolzejcjshkmlron");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 *
 * @summary returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 * x-ms-original-file: 2025-05-01-preview/Monitors_LatestLinkedSaaS_MinimumSet_Gen.json
 */
async function monitorsLatestLinkedSaaSMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.latestLinkedSaaS("rgopenapi", "ipxmlcbonyxtolzejcjshkmlron");
  console.log(result);
}

async function main() {
  await monitorsLatestLinkedSaaSMaximumSetGen();
  await monitorsLatestLinkedSaaSMinimumSetGen();
}

main().catch(console.error);
