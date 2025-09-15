// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a archive for a container registry with the specified parameters.
 *
 * @summary creates a archive for a container registry with the specified parameters.
 * x-ms-original-file: 2025-05-01-preview/ArchiveCreate.json
 */
async function archiveCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.archives.create(
    "myResourceGroup",
    "myRegistry",
    "rpm",
    "myArchiveName",
    {
      properties: {
        packageSource: { type: "remote", url: "string" },
        publishedVersion: "string",
        repositoryEndpointPrefix: "string",
      },
    },
  );
  console.log(result);
}

async function main() {
  await archiveCreate();
}

main().catch(console.error);
