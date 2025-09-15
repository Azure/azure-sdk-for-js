// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a cache rule resource from a container registry.
 *
 * @summary deletes a cache rule resource from a container registry.
 * x-ms-original-file: 2025-05-01-preview/CacheRuleDelete.json
 */
async function cacheRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.cacheRules.delete("myResourceGroup", "myRegistry", "myCacheRule");
}

async function main(): Promise<void> {
  await cacheRuleDelete();
}

main().catch(console.error);
