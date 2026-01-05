// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the properties of the specified scope map.
 *
 * @summary Gets the properties of the specified scope map.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/ScopeMapGet.json
 */
async function scopeMapGet(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const scopeMapName = "myScopeMap";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.scopeMaps.get(
    resourceGroupName,
    registryName,
    scopeMapName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scopeMapGet();
}

main().catch(console.error);
