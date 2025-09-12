// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a archive for a container registry with the specified parameters.
 *
 * @summary Creates a archive for a container registry with the specified parameters.
 * x-ms-original-file: specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/preview/2025-05-01-preview/examples/ArchiveVersionCreate.json
 */
async function archiveVersionCreate(): Promise<void> {
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
  const result = await client.archiveVersions.beginCreateAndWait(
    resourceGroupName,
    registryName,
    packageType,
    archiveName,
    archiveVersionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await archiveVersionCreate();
}

main().catch(console.error);
