// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  StaticMembersDeleteParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deletes a static member.
 *
 * @summary Deletes a static member.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerStaticMemberDelete.json
 */
async function staticMembersDelete() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "SampleRG";
  const networkManagerName = "TestNM";
  const networkGroupName = "testNetworkGroup";
  const staticMemberName = "testStaticMember";
  const options: StaticMembersDeleteParameters = {
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
    .delete(options);
  console.log(result);
}

staticMembersDelete().catch(console.error);
