// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateLinkScopesClient } from "@azure/arm-kubernetesconfiguration-privatelinkscopes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Azure Arc PrivateLinkScopes within a resource group.
 *
 * @summary gets a list of Azure Arc PrivateLinkScopes within a resource group.
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesListByResourceGroup.json
 */
async function privateLinkScopeListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkScopes.listByResourceGroup("my-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateLinkScopeListByResourceGroup();
}

main().catch(console.error);
