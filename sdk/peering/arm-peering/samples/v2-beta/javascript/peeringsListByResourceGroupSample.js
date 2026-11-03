// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the peerings under the given subscription and resource group.
 *
 * @summary lists all of the peerings under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/ListPeeringsByResourceGroup.json
 */
async function listPeeringsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.peerings.listByResourceGroup("rgName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPeeringsInAResourceGroup();
}

main().catch(console.error);
