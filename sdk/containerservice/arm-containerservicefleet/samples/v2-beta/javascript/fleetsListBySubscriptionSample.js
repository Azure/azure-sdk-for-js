// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to lists fleets in the specified subscription.
 *
 * @summary lists fleets in the specified subscription.
 * x-ms-original-file: 2025-04-01-preview/Fleets_ListBySub.json
 */

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

async function listsTheFleetResourcesInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists fleets in the specified subscription.
 *
 * @summary lists fleets in the specified subscription.
 * x-ms-original-file: 2025-04-01-preview/Fleets_ListBySubscription_MaximumSet_Gen.json
 */
async function listsTheFleetResourcesInASubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsTheFleetResourcesInASubscription();
  await listsTheFleetResourcesInASubscriptionGeneratedByMaximumSetRule();
}

main().catch(console.error);
