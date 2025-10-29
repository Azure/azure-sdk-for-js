// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all archives for the specified container registry and package type.
 *
 * @summary lists all archives for the specified container registry and package type.
 * x-ms-original-file: 2025-06-01-preview/ArchiveList.json
 */
async function archiveList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.archives.list("myResourceGroup", "myRegistry", "myPackageType")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await archiveList();
}

main().catch(console.error);
