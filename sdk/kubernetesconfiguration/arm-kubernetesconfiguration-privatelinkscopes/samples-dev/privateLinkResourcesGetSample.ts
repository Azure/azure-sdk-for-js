// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @summary Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopePrivateLinkResourceGet.json
 */

import { PrivateLinkScopesClient } from "@azure/arm-kubernetesconfiguration-privatelinkscopes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsPrivateEndpointConnection(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const scopeName = "myPrivateLinkScope";
  const groupName = "KubernetesConfiguration";
  const credential = new DefaultAzureCredential();
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    resourceGroupName,
    scopeName,
    groupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
