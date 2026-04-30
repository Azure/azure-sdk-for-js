// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a cache rule for a container registry with the specified parameters.
 *
 * @summary creates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-01-01-preview/CacheRuleCreate.json
 */
async function cacheRuleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.create("myResourceGroup", "myRegistry", "myCacheRule", {
    sourceRepository: "docker.io/library/hello-world",
    targetRepository: "cached-docker-hub/hello-world",
    credentialSetResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/credentialSets/myCredentialSet",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a cache rule for a container registry with the specified parameters.
 *
 * @summary creates a cache rule for a container registry with the specified parameters.
 * x-ms-original-file: 2026-01-01-preview/CacheRuleCreateUserAssignedMIAuthentication.json
 */
async function cacheRuleCreateUserAssignedMIAuthentication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.cacheRules.create("myResourceGroup", "myRegistry", "myCacheRule", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myUserAssignedIdentity":
          {},
      },
    },
    sourceRepository: "acr-registry.azurecr.io/library/repository",
    targetRepository: "cached-acr/hello-world",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cacheRuleCreate();
  await cacheRuleCreateUserAssignedMIAuthentication();
}

main().catch(console.error);
