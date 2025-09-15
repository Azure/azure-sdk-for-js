// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified container registry.
 *
 * @summary gets the properties of the specified container registry.
 * x-ms-original-file: 2025-05-01-preview/RegistryGet.json
 */
async function registryGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.get("myResourceGroup", "myRegistry");
  console.log(result);
}

async function main(): Promise<void> {
  await registryGet();
}

main().catch(console.error);
