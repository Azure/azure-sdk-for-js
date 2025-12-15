// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PrivateEndpointConnection} from "@azure/arm-containerservice";
import {
  ContainerServiceClient,
} from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a private endpoint connection.
 *
 * @summary Updates a private endpoint connection.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/PrivateEndpointConnectionsUpdate.json
 */
async function updatePrivateEndpointConnection(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const privateEndpointConnectionName = "privateendpointconnection1";
  const parameters: PrivateEndpointConnection = {
    privateLinkServiceConnectionState: { status: "Approved" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.update(
    resourceGroupName,
    resourceName,
    privateEndpointConnectionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatePrivateEndpointConnection();
}

main().catch(console.error);
