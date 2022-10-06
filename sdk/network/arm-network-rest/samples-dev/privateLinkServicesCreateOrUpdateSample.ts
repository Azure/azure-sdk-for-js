// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PrivateLinkServicesCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates an private link service in the specified resource group.
 *
 * @summary Creates or updates an private link service in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateLinkServiceCreate.json
 */
async function createPrivateLinkService() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceName = "testPls";
  const options: PrivateLinkServicesCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        autoApproval: { subscriptions: ["subscription1", "subscription2"] },
        fqdns: ["fqdn1", "fqdn2", "fqdn3"],
        ipConfigurations: [
          {
            name: "fe-lb",
            properties: {
              privateIPAddress: "10.0.1.4",
              privateIPAddressVersion: "IPv4",
              privateIPAllocationMethod: "Static",
              subnet: {
                id:
                  "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnetlb/subnets/subnetlb",
              },
            },
          },
        ],
        loadBalancerFrontendIpConfigurations: [
          {
            id:
              "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/loadBalancers/lb/frontendIPConfigurations/fe-lb",
          },
        ],
        visibility: {
          subscriptions: ["subscription1", "subscription2", "subscription3"],
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}",
      subscriptionId,
      resourceGroupName,
      serviceName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPrivateLinkService().catch(console.error);
