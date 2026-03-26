// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a VpnSite resource if it doesn't exist else updates the existing VpnSite.
 *
 * @summary creates a VpnSite resource if it doesn't exist else updates the existing VpnSite.
 * x-ms-original-file: 2025-05-01/VpnSitePut.json
 */
async function vpnSiteCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnSites.createOrUpdate("rg1", "vpnSite1", {
    location: "West US",
    addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
    isSecuritySite: false,
    o365Policy: { breakOutCategories: { default: false, allow: true, optimize: true } },
    virtualWan: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualWANs/wan1",
    },
    vpnSiteLinks: [
      {
        bgpProperties: { asn: 1234, bgpPeeringAddress: "192.168.0.0" },
        fqdn: "link1.vpnsite1.contoso.com",
        ipAddress: "50.50.50.56",
        linkProperties: { linkProviderName: "vendor1", linkSpeedInMbps: 0 },
      },
    ],
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await vpnSiteCreate();
}

main().catch(console.error);
