// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { StaticMembersGetParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified static member.
 *
 * @summary Gets the specified static member.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerStaticMemberGet.json
 */
async function staticMembersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const networkGroupName = "testNetworkGroup";
  const staticMemberName = "testStaticMember";
  const options: StaticMembersGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/networkGroups/{networkGroupName}/staticMembers/{staticMemberName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      networkGroupName,
      staticMemberName,
    )
    .get(options);
  console.log(result);
}

staticMembersGet().catch(console.error);
