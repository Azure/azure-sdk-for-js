// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Approve or reject private end point connection for a private link service in a subscription.
 *
 * @summary Approve or reject private end point connection for a private link service in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateLinkServiceUpdatePrivateEndpointConnection.json
 */

import type { PrivateLinkServicesUpdatePrivateEndpointConnectionParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function approveOrRejectPrivateEndPointConnectionForAPrivateLinkService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceName = "testPls";
  const peConnectionName = "testPlePeConnection";
  const options: PrivateLinkServicesUpdatePrivateEndpointConnectionParameters = {
    body: {
      name: "testPlePeConnection",
      properties: {
        privateLinkServiceConnectionState: {
          description: "approved it for some reason.",
          status: "Approved",
        },
      },
    },
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
    .put(options);
  console.log(result);
}

approveOrRejectPrivateEndPointConnectionForAPrivateLinkService().catch(console.error);
