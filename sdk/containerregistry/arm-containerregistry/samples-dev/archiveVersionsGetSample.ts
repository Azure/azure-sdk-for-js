// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the properties of the archive version.
 *
 * @summary Gets the properties of the archive version.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/preview/2025-03-01-preview/examples/ArchiveVersionGet.json
 */
async function archiveVersionGet(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERREGISTRY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERREGISTRY_RESOURCE_GROUP"] || "myResourceGroup";
  const registryName = "myRegistry";
  const packageType = "rpm";
  const archiveName = "myArchiveName";
  const archiveVersionName = "myArchiveVersionName";
  const credential = new DefaultAzureCredential();
  const client = new ContainerRegistryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.archiveVersions.get(
    resourceGroupName,
    registryName,
    packageType,
    archiveName,
    archiveVersionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await archiveVersionGet();
}

main().catch(console.error);
