// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the connected registry.
 *
 * @summary gets the properties of the connected registry.
 * x-ms-original-file: 2025-05-01-preview/ConnectedRegistryGet.json
 */
async function connectedRegistryGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.connectedRegistries.get(
    "myResourceGroup",
    "myRegistry",
    "myConnectedRegistry",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectedRegistryGet();
}

main().catch(console.error);
