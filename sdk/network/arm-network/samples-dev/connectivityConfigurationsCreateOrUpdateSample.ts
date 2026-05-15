// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates/Updates a new network manager connectivity configuration
 *
 * @summary creates/Updates a new network manager connectivity configuration
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectivityConfigurationPut.json
 */
async function connectivityConfigurationsPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.connectivityConfigurations.createOrUpdate(
    "myResourceGroup",
    "testNetworkManager",
    "myTestConnectivityConfig",
    {
      description: "Sample Configuration",
      appliesToGroups: [
        {
          groupConnectivity: "None",
          isGlobal: "False",
          networkGroupId:
            "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkManagers/testNetworkManager/networkGroups/group1",
          useHubGateway: "True",
        },
      ],
      connectivityCapabilities: {
        connectedGroupAddressOverlap: "Allowed",
        connectedGroupPrivateEndpointsScale: "Standard",
        peeringEnforcement: "Unenforced",
      },
      connectivityTopology: "HubAndSpoke",
      deleteExistingPeering: "True",
      hubs: [
        {
          resourceId:
            "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myTestConnectivityConfig",
          resourceType: "Microsoft.Network/virtualNetworks",
        },
      ],
      isGlobal: "True",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectivityConfigurationsPut();
}

main().catch(console.error);
