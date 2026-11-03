// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a PrivateEndpointConnection
 *
 * @summary delete a PrivateEndpointConnection
 * x-ms-original-file: 2026-03-01/PrivateEndpointConnectionDelete.json
 */
async function deletePrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.privateEndpointConnectionsInterface.delete("rg1", "tc1", "pec1");
}

async function main(): Promise<void> {
  await deletePrivateEndpointConnection();
}

main().catch(console.error);
