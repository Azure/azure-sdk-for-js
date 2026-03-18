// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of all Azure Arc PrivateLinkScopes within a subscription.
 *
 * @summary Gets a list of all Azure Arc PrivateLinkScopes within a subscription.
 * x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/privateLinkScopes/preview/2024-11-01-preview/examples/PrivateLinkScopesList.json
 */

import { PrivateLinkScopesClient } from "@azure/arm-kubernetesconfiguration-privatelinkscopes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateLinkScopesListJson(): Promise<void> {
  const subscriptionId =
    process.env["KUBERNETESCONFIGURATION_SUBSCRIPTION_ID"] ||
    "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const credential = new DefaultAzureCredential();
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkScopes.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await privateLinkScopesListJson();
}

main().catch(console.error);
