// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the archive version.
 *
 * @summary gets the properties of the archive version.
 * x-ms-original-file: 2025-06-01-preview/ArchiveVersionGet.json
 */
async function archiveVersionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.archiveVersions.get(
    "myResourceGroup",
    "myRegistry",
    "rpm",
    "myArchiveName",
    "myArchiveVersionName",
  );
  console.log(result);
}

async function main() {
  await archiveVersionGet();
}

main().catch(console.error);
