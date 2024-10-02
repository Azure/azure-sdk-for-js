// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PrivateLinkServicesGetPrivateEndpointConnectionParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get the specific private end point connection by specific private link service in the resource group.
 *
 * @summary Get the specific private end point connection by specific private link service in the resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateLinkServiceGetPrivateEndpointConnection.json
 */
async function getPrivateEndPointConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceName = "testPls";
  const peConnectionName = "testPlePeConnection";
  const options: PrivateLinkServicesGetPrivateEndpointConnectionParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections/{peConnectionName}",
      subscriptionId,
      resourceGroupName,
      serviceName,
      peConnectionName,
    )
    .get(options);
  console.log(result);
}

getPrivateEndPointConnection().catch(console.error);
