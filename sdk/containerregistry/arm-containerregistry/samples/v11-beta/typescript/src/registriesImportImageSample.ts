// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to copies an image to this container registry from the specified container registry.
 *
 * @summary copies an image to this container registry from the specified container registry.
 * x-ms-original-file: 2025-05-01-preview/ImportImageByManifestDigest.json
 */
async function importImageByManifestDigest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.registries.importImage("myResourceGroup", "myRegistry", {
    mode: "Force",
    source: {
      resourceId:
        "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/sourceResourceGroup/providers/Microsoft.ContainerRegistry/registries/sourceRegistry",
      sourceImage:
        "sourceRepository@sha256:0000000000000000000000000000000000000000000000000000000000000000",
    },
    targetTags: ["targetRepository:targetTag"],
    untaggedTargetRepositories: ["targetRepository1"],
  });
}

/**
 * This sample demonstrates how to copies an image to this container registry from the specified container registry.
 *
 * @summary copies an image to this container registry from the specified container registry.
 * x-ms-original-file: 2025-05-01-preview/ImportImageByTag.json
 */
async function importImageByTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.registries.importImage("myResourceGroup", "myRegistry", {
    mode: "Force",
    source: {
      resourceId:
        "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/sourceResourceGroup/providers/Microsoft.ContainerRegistry/registries/sourceRegistry",
      sourceImage: "sourceRepository:sourceTag",
    },
    targetTags: ["targetRepository:targetTag"],
    untaggedTargetRepositories: ["targetRepository1"],
  });
}

/**
 * This sample demonstrates how to copies an image to this container registry from the specified container registry.
 *
 * @summary copies an image to this container registry from the specified container registry.
 * x-ms-original-file: 2025-05-01-preview/ImportImageFromPublicRegistry.json
 */
async function importImageFromPublicRegistry(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.registries.importImage("myResourceGroup", "myRegistry", {
    mode: "Force",
    source: {
      registryUri: "registry.hub.docker.com",
      sourceImage: "library/hello-world",
    },
    targetTags: ["targetRepository:targetTag"],
    untaggedTargetRepositories: ["targetRepository1"],
  });
}

async function main(): Promise<void> {
  await importImageByManifestDigest();
  await importImageByTag();
  await importImageFromPublicRegistry();
}

main().catch(console.error);
