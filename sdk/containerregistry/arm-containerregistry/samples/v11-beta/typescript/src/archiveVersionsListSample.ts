// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all archive versions for the specified container registry, repository type and archive name.
 *
 * @summary lists all archive versions for the specified container registry, repository type and archive name.
 * x-ms-original-file: 2025-05-01-preview/ArchiveVersionList.json
 */
async function archiveVersionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.archiveVersions.list(
    "myResourceGroup",
    "myRegistry",
    "myPackageType",
    "myArchiveName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await archiveVersionList();
}

main().catch(console.error);
