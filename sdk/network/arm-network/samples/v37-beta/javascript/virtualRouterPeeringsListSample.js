// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Virtual Router Peerings in a Virtual Router resource.
 *
 * @summary lists all Virtual Router Peerings in a Virtual Router resource.
 * x-ms-original-file: 2025-05-01/VirtualRouterPeeringList.json
 */
async function listAllVirtualRouterPeeringsForAGivenVirtualRouter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualRouterPeerings.list("rg1", "virtualRouter")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllVirtualRouterPeeringsForAGivenVirtualRouter();
}

main().catch(console.error);
