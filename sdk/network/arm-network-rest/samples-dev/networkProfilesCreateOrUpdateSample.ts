// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkProfilesCreateOrUpdateParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a network profile.
 *
 * @summary Creates or updates a network profile.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkProfileCreateConfigOnly.json
 */
async function createNetworkProfileDefaults() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkProfileName = "networkProfile1";
  const options: NetworkProfilesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        containerNetworkInterfaceConfigurations: [
          {
            name: "eth1",
            properties: {
              ipConfigurations: [
                {
                  name: "ipconfig1",
                  properties: {
                    subnet: {
                      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/networkProfileVnet/subnets/networkProfileSubnet1",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkProfiles/{networkProfileName}",
      subscriptionId,
      resourceGroupName,
      networkProfileName,
    )
    .put(options);
  console.log(result);
}

createNetworkProfileDefaults().catch(console.error);
