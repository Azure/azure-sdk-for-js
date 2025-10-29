// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a archive from a container registry.
 *
 * @summary deletes a archive from a container registry.
 * x-ms-original-file: 2025-06-01-preview/ArchiveDelete.json
 */
async function archiveDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.archives.delete("myResourceGroup", "myRegistry", "myPackageType", "myArchiveName");
}

async function main(): Promise<void> {
  await archiveDelete();
}

main().catch(console.error);
