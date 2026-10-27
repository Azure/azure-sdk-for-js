// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list PrivateEndpointConnection resources by TrafficController
 *
 * @summary list PrivateEndpointConnection resources by TrafficController
 * x-ms-original-file: 2026-03-01/PrivateEndpointConnectionsGet.json
 */
async function getPrivateEndpointConnections(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnectionsInterface.listByTrafficController(
    "rg1",
    "tc1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getPrivateEndpointConnections();
}

main().catch(console.error);
