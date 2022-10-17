// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ServiceAssociationLinksListParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of service association links for a subnet.
 *
 * @summary Gets a list of service association links for a subnet.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGetServiceAssociationLinks.json
 */
async function getServiceAssociationLinks() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "vnet";
  const subnetName = "subnet";
  const options: ServiceAssociationLinksListParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/ServiceAssociationLinks",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      subnetName
    )
    .get(options);
  console.log(result);
}

getServiceAssociationLinks().catch(console.error);
