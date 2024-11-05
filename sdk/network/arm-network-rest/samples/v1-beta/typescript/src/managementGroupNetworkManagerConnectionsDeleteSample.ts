// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ManagementGroupNetworkManagerConnectionsDeleteParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete specified pending connection created by this management group.
 *
 * @summary Delete specified pending connection created by this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerConnectionManagementGroupDelete.json
 */
async function deleteManagementGroupNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const managementGroupId = "managementGroupA";
  const networkManagerConnectionName = "TestNMConnection";
  const options: ManagementGroupNetworkManagerConnectionsDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}",
      managementGroupId,
      networkManagerConnectionName
    )
    .delete(options);
  console.log(result);
}

deleteManagementGroupNetworkManagerConnection().catch(console.error);
