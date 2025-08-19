// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a archive from a container registry.
 *
 * @summary Deletes a archive from a container registry.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/ArchiveDelete.json
 */

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function archiveDelete(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const packageType = "myPackageType";
  const archiveName = "myArchiveName";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.archives.beginDeleteAndWait(
    resourceGroupName,
    registryName,
    packageType,
    archiveName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await archiveDelete();
}

main().catch(console.error);
