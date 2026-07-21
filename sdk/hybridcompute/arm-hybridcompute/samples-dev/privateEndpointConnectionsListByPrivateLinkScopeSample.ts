// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all private endpoint connections on a private link scope.
 *
 * @summary gets all private endpoint connections on a private link scope.
 * x-ms-original-file: 2025-09-16-preview/privateEndpoint/PrivateEndpointConnection_List.json
 */
async function getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByPrivateLinkScope(
    "myResourceGroup",
    "myPrivateLinkScope",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope();
}

main().catch(console.error);
