// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the archive.
 *
 * @summary gets the properties of the archive.
 * x-ms-original-file: 2025-06-01-preview/ArchiveGet.json
 */
async function archiveGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.archives.get(
    "myResourceGroup",
    "myRegistry",
    "myPackageType",
    "myArchiveName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await archiveGet();
}

main().catch(console.error);
