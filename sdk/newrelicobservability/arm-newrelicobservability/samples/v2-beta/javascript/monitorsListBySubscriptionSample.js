// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all New Relic monitor resources either within a specific subscription
 *
 * @summary Lists all New Relic monitor resources either within a specific subscription
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_ListBySubscription_MaximumSet_Gen.json
 */
async function monitorsListBySubscriptionMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await monitorsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
