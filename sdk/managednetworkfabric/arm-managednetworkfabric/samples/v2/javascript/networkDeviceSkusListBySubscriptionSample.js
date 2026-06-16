// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Network Device SKUs for the given subscription.
 *
 * @summary list Network Device SKUs for the given subscription.
 * x-ms-original-file: 2025-07-15/NetworkDeviceSkus_ListBySubscription.json
 */
async function networkDeviceSkusListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkDeviceSkus.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await networkDeviceSkusListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
