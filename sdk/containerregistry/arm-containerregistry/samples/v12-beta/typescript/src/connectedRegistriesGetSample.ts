// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the properties of the connected registry.
 *
 * @summary Gets the properties of the connected registry.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/stable/2025-11-01/examples/ConnectedRegistryGet.json
 */
async function connectedRegistryGet(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const connectedRegistryName = "myConnectedRegistry";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.connectedRegistries.get(
    resourceGroupName,
    registryName,
    connectedRegistryName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await connectedRegistryGet();
}

main().catch(console.error);
