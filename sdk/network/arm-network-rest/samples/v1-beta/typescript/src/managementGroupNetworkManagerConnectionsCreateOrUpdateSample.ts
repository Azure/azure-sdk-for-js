// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ManagementGroupNetworkManagerConnectionsCreateOrUpdateParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create a network manager connection on this management group.
 *
 * @summary Create a network manager connection on this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerConnectionManagementGroupPut.json
 */
async function createOrUpdateManagementGroupNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const managementGroupId = "managementGroupA";
  const networkManagerConnectionName = "TestNMConnection";
  const options: ManagementGroupNetworkManagerConnectionsCreateOrUpdateParameters = {
    body: {
      properties: {
        networkManagerId:
          "/subscriptions/subscriptionC/resourceGroup/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager"
      }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}",
      managementGroupId,
      networkManagerConnectionName
    )
    .put(options);
  console.log(result);
}

createOrUpdateManagementGroupNetworkManagerConnection().catch(console.error);
