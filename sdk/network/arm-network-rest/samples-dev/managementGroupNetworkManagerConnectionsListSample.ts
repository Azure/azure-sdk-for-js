// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ManagementGroupNetworkManagerConnectionsListParameters,
  paginate,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List all network manager connections created by this management group.
 *
 * @summary List all network manager connections created by this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerConnectionManagementGroupList.json
 */
async function listManagementGroupNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const managementGroupId = "managementGroupA";
  const options: ManagementGroupNetworkManagerConnectionsListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections",
      managementGroupId,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listManagementGroupNetworkManagerConnection().catch(console.error);
