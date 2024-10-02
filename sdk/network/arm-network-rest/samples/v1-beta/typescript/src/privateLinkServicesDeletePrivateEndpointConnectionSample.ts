// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PrivateLinkServicesDeletePrivateEndpointConnectionParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete private end point connection for a private link service in a subscription.
 *
 * @summary Delete private end point connection for a private link service in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateLinkServiceDeletePrivateEndpointConnection.json
 */
async function deletePrivateEndPointConnectionForAPrivateLinkService() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceName = "testPls";
  const peConnectionName = "testPlePeConnection";
  const options: PrivateLinkServicesDeletePrivateEndpointConnectionParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections/{peConnectionName}",
      subscriptionId,
      resourceGroupName,
      serviceName,
      peConnectionName
    )
    .delete(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

deletePrivateEndPointConnectionForAPrivateLinkService().catch(console.error);
