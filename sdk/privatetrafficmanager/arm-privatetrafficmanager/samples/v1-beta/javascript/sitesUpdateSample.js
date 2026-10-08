// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PrivateTrafficManagerManagementClient } = require("@azure/arm-privatetrafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a Site.
 *
 * @summary updates a Site.
 * x-ms-original-file: 2026-02-09-preview/Sites_Update_MaximumSet_Gen.json
 */
async function sitesUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.sites.update("rgprivateTrafficManager", "myTopologyMap", "mySite", {
    properties: {
      probingGatewayIds: [
        "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/probingGateways/myProbingGateway",
        "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/probingGateways/myProbingGateway2",
      ],
      virtualNetworkIds: [
        "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/virtualNetworks/myVirtualNetwork",
      ],
    },
  });
  console.log(result);
}

async function main() {
  await sitesUpdateMaximumSet();
}

main().catch(console.error);
