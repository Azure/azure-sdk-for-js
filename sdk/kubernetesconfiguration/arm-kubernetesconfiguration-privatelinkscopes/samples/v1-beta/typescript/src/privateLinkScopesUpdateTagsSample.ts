// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateLinkScopesClient } from "@azure/arm-kubernetesconfiguration-privatelinkscopes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method.
 *
 * @summary updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method.
 * x-ms-original-file: 2024-11-01-preview/PrivateLinkScopesUpdateTagsOnly.json
 */
async function privateLinkScopeUpdateTagsOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PrivateLinkScopesClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.updateTags(
    "my-resource-group",
    "my-privatelinkscope",
    { tags: { Tag1: "Value1", Tag2: "Value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkScopeUpdateTagsOnly();
}

main().catch(console.error);
