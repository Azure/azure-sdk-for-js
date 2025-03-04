// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { NetworkVirtualAppliancesListByResourceGroupParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all Network Virtual Appliances in a resource group.
 *
 * @summary Lists all Network Virtual Appliances in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkVirtualApplianceListByResourceGroup.json
 */
async function listAllNetworkVirtualApplianceForAGivenResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const options: NetworkVirtualAppliancesListByResourceGroupParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances",
      subscriptionId,
      resourceGroupName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listAllNetworkVirtualApplianceForAGivenResourceGroup().catch(console.error);
