// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PrivateLinkServicesListPrivateEndpointConnectionsParameters,
  paginate
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets all private end point connections for a specific private link service.
 *
 * @summary Gets all private end point connections for a specific private link service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateLinkServiceListPrivateEndpointConnection.json
 */
async function listPrivateLinkServiceInResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceName = "testPls";
  const options: PrivateLinkServicesListPrivateEndpointConnectionsParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections",
      subscriptionId,
      resourceGroupName,
      serviceName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listPrivateLinkServiceInResourceGroup().catch(console.error);
