// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a archive version from a container registry.
 *
 * @summary deletes a archive version from a container registry.
 * x-ms-original-file: 2025-05-01-preview/ArchiveVersionDelete.json
 */
async function archiveVersionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.archiveVersions.delete(
    "myResourceGroup",
    "myRegistry",
    "myPackageType",
    "myArchiveName",
    "myArchiveVersionName",
  );
}

async function main() {
  await archiveVersionDelete();
}

main().catch(console.error);
