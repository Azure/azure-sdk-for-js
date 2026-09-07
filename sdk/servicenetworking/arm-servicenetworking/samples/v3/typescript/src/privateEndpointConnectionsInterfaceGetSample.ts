// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a PrivateEndpointConnection
 *
 * @summary get a PrivateEndpointConnection
 * x-ms-original-file: 2026-03-01/PrivateEndpointConnectionGet.json
 */
async function getPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnectionsInterface.get("rg1", "tc1", "pec1");
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateEndpointConnection();
}

main().catch(console.error);
