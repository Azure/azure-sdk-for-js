// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to displays L2IsolationDomains list by subscription GET method.
 *
 * @summary displays L2IsolationDomains list by subscription GET method.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_ListBySubscription.json
 */
async function l2IsolationDomainsListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.l2IsolationDomains.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await l2IsolationDomainsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
