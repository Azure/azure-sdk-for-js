// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkSecurityGroupsGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified network security group.
 *
 * @summary Gets the specified network security group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkSecurityGroupGet.json
 */
async function getNetworkSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkSecurityGroupName = "testnsg";
  const options: NetworkSecurityGroupsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}",
      subscriptionId,
      resourceGroupName,
      networkSecurityGroupName,
    )
    .get(options);
  console.log(result);
}

getNetworkSecurityGroup().catch(console.error);
