// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a virtual network link to the specified Private DNS zone.
 *
 * @summary updates a virtual network link to the specified Private DNS zone.
 * x-ms-original-file: 2024-06-01/VirtualNetworkLinkPatch.json
 */
async function patchPrivateDNSZoneVirtualNetworkLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.virtualNetworkLinks.update(
    "resourceGroup1",
    "privatelink.contoso.com",
    "virtualNetworkLink1",
    {
      properties: {
        registrationEnabled: true,
        resolutionPolicy: "NxDomainRedirect",
      },
      tags: { key2: "value2" },
    },
  );
  console.log(result);
}

async function main() {
  await patchPrivateDNSZoneVirtualNetworkLink();
}

main().catch(console.error);
