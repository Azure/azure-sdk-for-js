// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualHubBgpConnectionsListParameters,
  paginate
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Retrieves the details of all VirtualHubBgpConnections.
 *
 * @summary Retrieves the details of all VirtualHubBgpConnections.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualHubBgpConnectionList.json
 */
async function virtualHubRouteTableV2List() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualHubName = "hub1";
  const options: VirtualHubBgpConnectionsListParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/bgpConnections",
      subscriptionId,
      resourceGroupName,
      virtualHubName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

virtualHubRouteTableV2List().catch(console.error);
