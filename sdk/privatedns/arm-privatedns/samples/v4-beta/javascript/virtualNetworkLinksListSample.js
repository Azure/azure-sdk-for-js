// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the virtual network links to the specified Private DNS zone.
 *
 * @summary lists the virtual network links to the specified Private DNS zone.
 * x-ms-original-file: 2024-06-01/VirtualNetworkLinkList.json
 */
async function getPrivateDNSZoneVirtualNetworkLinks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkLinks.list(
    "resourceGroup1",
    "privatelink.contoso.com",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getPrivateDNSZoneVirtualNetworkLinks();
}

main().catch(console.error);
