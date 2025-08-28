// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Approve or reject private end point connection for a private link service in a subscription.
 *
 * @summary Approve or reject private end point connection for a private link service in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/PrivateLinkServiceUpdatePrivateEndpointConnection.json
 */

import type {
  PrivateEndpointConnection} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function approveOrRejectPrivateEndPointConnectionForAPrivateLinkService(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceName = "testPls";
  const peConnectionName = "testPlePeConnection";
  const parameters: PrivateEndpointConnection = {
    name: "testPlePeConnection",
    privateEndpoint: {
      id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateEndpoints/testPe",
    },
    privateLinkServiceConnectionState: {
      description: "approved it for some reason.",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.privateLinkServices.updatePrivateEndpointConnection(
      resourceGroupName,
      serviceName,
      peConnectionName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await approveOrRejectPrivateEndPointConnectionForAPrivateLinkService();
}

main().catch(console.error);
