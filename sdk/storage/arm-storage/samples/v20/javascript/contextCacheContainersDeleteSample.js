// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a container from a Context Cache.
 *
 * @summary delete a container from a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheContainerCRUD/ContextCacheContainers_Delete.json
 */
async function deleteAContextCacheContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.contextCacheContainers.delete("testrg", "testaccount", "gpt4-prompts");
}

async function main() {
  await deleteAContextCacheContainer();
}

main().catch(console.error);
