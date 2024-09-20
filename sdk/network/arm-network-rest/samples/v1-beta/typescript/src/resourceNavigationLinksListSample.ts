// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ResourceNavigationLinksListParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of resource navigation links for a subnet.
 *
 * @summary Gets a list of resource navigation links for a subnet.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGetResourceNavigationLinks.json
 */
async function getResourceNavigationLinks() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "vnet";
  const subnetName = "subnet";
  const options: ResourceNavigationLinksListParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/ResourceNavigationLinks",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      subnetName
    )
    .get(options);
  console.log(result);
}

getResourceNavigationLinks().catch(console.error);
