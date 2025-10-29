// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified scope map.
 *
 * @summary gets the properties of the specified scope map.
 * x-ms-original-file: 2025-06-01-preview/ScopeMapGet.json
 */
async function scopeMapGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.scopeMaps.get("myResourceGroup", "myRegistry", "myScopeMap");
  console.log(result);
}

async function main(): Promise<void> {
  await scopeMapGet();
}

main().catch(console.error);
