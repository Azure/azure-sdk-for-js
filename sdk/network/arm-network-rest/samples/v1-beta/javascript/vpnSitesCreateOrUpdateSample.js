// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite.
 *
 * @summary Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VpnSitePut.json
 */
async function vpnSiteCreate() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const vpnSiteName = "vpnSite1";
  const options = {
    body: {
      location: "West US",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        isSecuritySite: false,
        o365Policy: {
          breakOutCategories: { default: false, allow: true, optimize: true },
        },
        virtualWan: {
          id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualWANs/wan1",
        },
        vpnSiteLinks: [
          {
            name: "vpnSiteLink1",
            properties: {
              bgpProperties: { asn: 1234, bgpPeeringAddress: "192.168.0.0" },
              fqdn: "link1.vpnsite1.contoso.com",
              ipAddress: "50.50.50.56",
              linkProperties: {
                linkProviderName: "vendor1",
                linkSpeedInMbps: 0,
              },
            },
          },
        ],
      },
      tags: { key1: "value1" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnSites/{vpnSiteName}",
      subscriptionId,
      resourceGroupName,
      vpnSiteName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

vpnSiteCreate().catch(console.error);
