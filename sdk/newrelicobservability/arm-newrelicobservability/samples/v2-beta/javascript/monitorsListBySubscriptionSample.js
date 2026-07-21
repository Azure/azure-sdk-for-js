// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all New Relic monitor resources either within a specific subscription
 *
 * @summary lists all New Relic monitor resources either within a specific subscription
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListBySubscription_MaximumSet_Gen.json
 */
async function monitorsListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
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
