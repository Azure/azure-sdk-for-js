// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified cache rule resource.
 *
 * @summary gets the properties of the specified cache rule resource.
 * x-ms-original-file: 2025-06-01-preview/CacheRuleGet.json
 */
async function cacheRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.get("myResourceGroup", "myRegistry", "myCacheRule");
  console.log(result);
}

async function main(): Promise<void> {
  await cacheRuleGet();
}

main().catch(console.error);
