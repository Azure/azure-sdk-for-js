// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resync the connected registry instance.
 *
 * @summary resync the connected registry instance.
 * x-ms-original-file: 2026-01-01-preview/ConnectedRegistryResync.json
 */
async function connectedRegistryResync(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.connectedRegistries.resync(
    "myResourceGroup",
    "myRegistry",
    "myConnectedRegistry",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectedRegistryResync();
}

main().catch(console.error);
