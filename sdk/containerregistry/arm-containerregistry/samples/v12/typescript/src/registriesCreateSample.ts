// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a container registry with the specified parameters.
 *
 * @summary creates a container registry with the specified parameters.
 * x-ms-original-file: 2025-11-01/RegistryCreate.json
 */
async function registryCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.create("myResourceGroup", "myRegistry", {
    location: "westus",
    tags: { key: "value" },
    sku: { name: "Standard" },
    adminUserEnabled: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a container registry with the specified parameters.
 *
 * @summary creates a container registry with the specified parameters.
 * x-ms-original-file: 2025-11-01/RegistryCreateAbac.json
 */
async function registryCreateAbac(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.create("myResourceGroup", "myRegistry", {
    location: "westus",
    tags: { key: "value" },
    sku: { name: "Standard" },
    roleAssignmentMode: "AbacRepositoryPermissions",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a container registry with the specified parameters.
 *
 * @summary creates a container registry with the specified parameters.
 * x-ms-original-file: 2025-11-01/RegistryCreateZoneRedundant.json
 */
async function registryCreateZoneRedundant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.create("myResourceGroup", "myRegistry", {
    location: "westus",
    tags: { key: "value" },
    sku: { name: "Standard" },
    zoneRedundancy: "Enabled",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await registryCreate();
  await registryCreateAbac();
  await registryCreateZoneRedundant();
}

main().catch(console.error);
