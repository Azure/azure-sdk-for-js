// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a archive for a container registry with the specified parameters.
 *
 * @summary updates a archive for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ArchiveUpdate.json
 */
async function archiveUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.archives.update(
    "myResourceGroup",
    "myRegistry",
    "myPackageType",
    "myArchiveName",
    { properties: { publishedVersion: "string" } },
  );
  console.log(result);
}

async function main() {
  await archiveUpdate();
}

main().catch(console.error);
