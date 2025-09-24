// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a Azure Arc PrivateLinkScope.
 *
 * @summary Returns a Azure Arc PrivateLinkScope.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesGet.json
 */

import { PrivateLinkScopesClient } from "@azure/arm-kubernetesconfiguration-privatelinkscopes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateLinkScopeGet(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] ||
    "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const resourceGroupName =
    process.env["KUBERNETESCONFIGURATION_RESOURCE_GROUP"] ||
    "my-resource-group";
  const scopeName = "my-privatelinkscope";
  const credential = new DefaultAzureCredential();
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.get(
    resourceGroupName,
    scopeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkScopeGet();
}

main().catch(console.error);
