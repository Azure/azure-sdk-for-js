// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateLinkScopesClient } from "@azure/arm-kubernetesconfiguration-privatelinkscopes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @summary gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkScopePrivateLinkResourceGet.json
 */
async function getsPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "myResourceGroup",
    "myPrivateLinkScope",
    "KubernetesConfiguration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
