// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a scope map for a container registry with the specified parameters.
 *
 * @summary creates a scope map for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ScopeMapCreate.json
 */
async function scopeMapCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.scopeMaps.create("myResourceGroup", "myRegistry", "myScopeMap", {
    properties: {
      description: "Developer Scopes",
      actions: ["repositories/myrepository/contentWrite", "repositories/myrepository/delete"],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scopeMapCreate();
}

main().catch(console.error);
