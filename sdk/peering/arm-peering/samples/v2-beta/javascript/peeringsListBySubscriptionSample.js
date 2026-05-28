// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the peerings under the given subscription.
 *
 * @summary lists all of the peerings under the given subscription.
 * x-ms-original-file: 2025-05-01/ListPeeringsBySubscription.json
 */
async function listPeeringsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peerings.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPeeringsInASubscription();
}

main().catch(console.error);
