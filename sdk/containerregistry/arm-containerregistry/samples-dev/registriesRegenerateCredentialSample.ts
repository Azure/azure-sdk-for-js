// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates one of the login credentials for the specified container registry.
 *
 * @summary regenerates one of the login credentials for the specified container registry.
 * x-ms-original-file: 2025-05-01-preview/RegistryRegenerateCredential.json
 */
async function registryRegenerateCredential(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.regenerateCredential("myResourceGroup", "myRegistry", {
    name: "password",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await registryRegenerateCredential();
}

main().catch(console.error);
