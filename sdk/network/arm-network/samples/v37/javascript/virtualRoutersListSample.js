// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the Virtual Routers in a subscription.
 *
 * @summary gets all the Virtual Routers in a subscription.
 * x-ms-original-file: 2025-05-01/VirtualRouterListBySubscription.json
 */
async function listAllVirtualRoutersForAGivenSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualRouters.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllVirtualRoutersForAGivenSubscription();
}

main().catch(console.error);
