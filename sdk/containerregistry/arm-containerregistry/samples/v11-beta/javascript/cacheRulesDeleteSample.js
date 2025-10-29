// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a cache rule resource from a container registry.
 *
 * @summary deletes a cache rule resource from a container registry.
 * x-ms-original-file: 2025-06-01-preview/CacheRuleDelete.json
 */
async function cacheRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.cacheRules.delete("myResourceGroup", "myRegistry", "myCacheRule");
}

async function main() {
  await cacheRuleDelete();
}

main().catch(console.error);
