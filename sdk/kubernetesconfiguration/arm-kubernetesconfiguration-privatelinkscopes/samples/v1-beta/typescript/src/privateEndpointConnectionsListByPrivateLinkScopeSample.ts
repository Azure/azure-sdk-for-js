// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateLinkScopesClient } from "@azure/arm-kubernetesconfiguration-privatelinkscopes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all private endpoint connections on a private link scope.
 *
 * @summary gets all private endpoint connections on a private link scope.
 * x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnectionList.json
 */
async function getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.listByPrivateLinkScope(
    "myResourceGroup",
    "myPrivateLinkScope",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsListOfPrivateEndpointConnectionsOnAPrivateLinkScope();
}

main().catch(console.error);
