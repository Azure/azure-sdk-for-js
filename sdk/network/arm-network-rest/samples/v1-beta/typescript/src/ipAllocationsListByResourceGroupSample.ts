// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  IpAllocationsListByResourceGroupParameters,
  paginate
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets all IpAllocations in a resource group.
 *
 * @summary Gets all IpAllocations in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/IpAllocationListByResourceGroup.json
 */
async function listIPAllocationsInResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const options: IpAllocationsListByResourceGroupParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/IpAllocations",
      subscriptionId,
      resourceGroupName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listIPAllocationsInResourceGroup().catch(console.error);
