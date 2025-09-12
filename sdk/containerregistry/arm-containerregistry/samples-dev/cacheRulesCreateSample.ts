// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CacheRule,
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a cache rule for a container registry with the specified parameters.
 *
 * @summary Creates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2025-05-01-preview/examples/CacheRuleCreate.json
 */
async function cacheRuleCreate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const cacheRuleName = "myCacheRule";
  const cacheRuleCreateParameters: CacheRule = {
    credentialSetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/credentialSets/myCredentialSet",
    sourceRepository: "docker.io/library/hello-world",
    targetRepository: "cached-docker-hub/hello-world",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.cacheRules.beginCreateAndWait(
    resourceGroupName,
    registryName,
    cacheRuleName,
    cacheRuleCreateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cacheRuleCreate();
}

main().catch(console.error);
