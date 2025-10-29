// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a archive version for a container registry with the specified parameters.
 *
 * @summary creates a archive version for a container registry with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ArchiveVersionCreate.json
 */
async function archiveVersionCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.archiveVersions.create(
    "myResourceGroup",
    "myRegistry",
    "rpm",
    "myArchiveName",
    "myArchiveVersionName",
  );
  console.log(result);
}

async function main() {
  await archiveVersionCreate();
}

main().catch(console.error);
