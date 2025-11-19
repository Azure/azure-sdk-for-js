// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to displays Network Taps list by subscription GET method.
 *
 * @summary displays Network Taps list by subscription GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkTaps_ListBySubscription.json
 */
async function networkTapsListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkTaps.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkTapsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
