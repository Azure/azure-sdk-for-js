// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a connected registry from a container registry.
 *
 * @summary deletes a connected registry from a container registry.
 * x-ms-original-file: 2025-05-01-preview/ConnectedRegistryDelete.json
 */
async function connectedRegistryDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.connectedRegistries.delete("myResourceGroup", "myRegistry", "myConnectedRegistry");
}

async function main(): Promise<void> {
  await connectedRegistryDelete();
}

main().catch(console.error);
