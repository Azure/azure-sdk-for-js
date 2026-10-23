// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Fabrics by subscription.
 *
 * @summary lists Fabrics by subscription.
 * x-ms-original-file: 2026-01-15-preview/Fabrics_ListBySubscription.json
 */
async function fabricsListBySubscriptionMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fabrics.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await fabricsListBySubscriptionMaximumSetGen();
}

main().catch(console.error);
