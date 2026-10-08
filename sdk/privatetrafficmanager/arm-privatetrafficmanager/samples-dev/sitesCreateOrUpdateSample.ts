// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateTrafficManagerManagementClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Site.
 *
 * @summary create or update a Site.
 * x-ms-original-file: 2026-02-09-preview/Sites_CreateOrUpdate_MaximumSet_Gen.json
 */
async function sitesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  const result = await client.sites.createOrUpdate(
    "rgprivateTrafficManager",
    "myTopologyMap",
    "mySite",
    {
      properties: {
        probingGatewayIds: [
          "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/probingGateways/myProbingGateway",
        ],
        virtualNetworkIds: [
          "/subscriptions/10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA/resourceGroups/rgprivateTrafficManager/providers/Microsoft.Network/virtualNetworks/myVirtualNetwork",
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sitesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
