// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { VirtualApplianceSitesListParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
 *
 * @summary Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkVirtualApplianceSiteList.json
 */
async function listAllNetworkVirtualApplianceSitesForAGivenNetworkVirtualAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkVirtualApplianceName = "nva";
  const options: VirtualApplianceSitesListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites",
      subscriptionId,
      resourceGroupName,
      networkVirtualApplianceName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listAllNetworkVirtualApplianceSitesForAGivenNetworkVirtualAppliance().catch(console.error);
