// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the private link resources for a container registry.
 *
 * @summary lists the private link resources for a container registry.
 * x-ms-original-file: 2025-05-01-preview/RegistryListPrivateLinkResources.json
 */
async function registryListPrivateLinkResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registries.listPrivateLinkResources(
    "myResourceGroup",
    "myRegistry",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await registryListPrivateLinkResources();
}

main().catch(console.error);
