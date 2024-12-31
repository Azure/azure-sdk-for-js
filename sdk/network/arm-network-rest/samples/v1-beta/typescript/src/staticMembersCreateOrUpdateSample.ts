// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  StaticMembersCreateOrUpdateParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates a static member.
 *
 * @summary Creates or updates a static member.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerStaticMemberPut.json
 */
async function staticMemberPut() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "testNetworkManager";
  const networkGroupName = "testNetworkGroup";
  const staticMemberName = "testStaticMember";
  const options: StaticMembersCreateOrUpdateParameters = {
    body: {
      properties: {
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroup/rg1/providers/Microsoft.Network/virtualnetworks/vnet1"
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/networkGroups/{networkGroupName}/staticMembers/{staticMemberName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName,
      networkGroupName,
      staticMemberName
    )
    .put(options);
  console.log(result);
}

staticMemberPut().catch(console.error);
