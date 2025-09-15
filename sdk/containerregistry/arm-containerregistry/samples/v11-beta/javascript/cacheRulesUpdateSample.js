// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a cache rule for a container registry with the specified parameters.
 *
 * @summary updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/CacheRuleUpdate.json
 */
async function cacheRuleUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.update("myResourceGroup", "myRegistry", "myCacheRule", {
    properties: {
      credentialSetResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/credentialSets/myCredentialSet2",
    },
  });
  console.log(result);
}

async function main() {
  await cacheRuleUpdate();
}

main().catch(console.error);
