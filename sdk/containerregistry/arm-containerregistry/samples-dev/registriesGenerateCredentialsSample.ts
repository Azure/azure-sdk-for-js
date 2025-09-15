// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate keys for a token of a specified container registry.
 *
 * @summary generate keys for a token of a specified container registry.
 * x-ms-original-file: 2025-05-01-preview/RegistryGenerateCredentials.json
 */
async function registryGenerateCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.registries.generateCredentials("myResourceGroup", "myRegistry", {
    expiry: new Date("2020-12-31T15:59:59.0707808Z"),
    tokenId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ContainerRegistry/registries/myRegistry/tokens/myToken",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await registryGenerateCredentials();
}

main().catch(console.error);
