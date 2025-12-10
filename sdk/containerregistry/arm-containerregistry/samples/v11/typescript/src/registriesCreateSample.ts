// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Registry} from "@azure/arm-containerregistry";
import {
  ContainerRegistryManagementClient,
} from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a container registry with the specified parameters.
 *
 * @summary Creates a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/RegistryCreate.json
 */
async function registryCreate(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const registry: Registry = {
    adminUserEnabled: true,
    location: "westus",
    sku: { name: "Standard" },
    tags: { key: "value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.registries.beginCreateAndWait(
    resourceGroupName,
    registryName,
    registry,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a container registry with the specified parameters.
 *
 * @summary Creates a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/RegistryCreateAbac.json
 */
async function registryCreateAbac(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const registry: Registry = {
    location: "westus",
    roleAssignmentMode: "AbacRepositoryPermissions",
    sku: { name: "Standard" },
    tags: { key: "value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.registries.beginCreateAndWait(
    resourceGroupName,
    registryName,
    registry,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a container registry with the specified parameters.
 *
 * @summary Creates a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/RegistryCreateZoneRedundant.json
 */
async function registryCreateZoneRedundant(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const registry: Registry = {
    location: "westus",
    sku: { name: "Standard" },
    tags: { key: "value" },
    zoneRedundancy: "Enabled",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.registries.beginCreateAndWait(
    resourceGroupName,
    registryName,
    registry,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registryCreate();
  await registryCreateAbac();
  await registryCreateZoneRedundant();
}

main().catch(console.error);
