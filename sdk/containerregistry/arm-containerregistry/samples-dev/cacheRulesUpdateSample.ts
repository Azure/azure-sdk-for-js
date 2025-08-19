// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CacheRuleUpdateParameters,
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a cache rule for a container registry with the specified parameters.
 *
 * @summary Updates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/CacheRuleUpdate.json
 */
async function cacheRuleUpdate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const cacheRuleName = "myCacheRule";
  const cacheRuleUpdateParameters: CacheRuleUpdateParameters = {
    credentialSetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/credentialSets/myCredentialSet2",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.cacheRules.beginUpdateAndWait(
    resourceGroupName,
    registryName,
    cacheRuleName,
    cacheRuleUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cacheRuleUpdate();
}

main().catch(console.error);
