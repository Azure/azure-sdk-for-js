// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a container in a Context Cache.
 *
 * @summary update a container in a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheContainerCRUD/ContextCacheContainers_Update.json
 */
async function updateAContextCacheContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCacheContainers.update(
    "testrg",
    "testaccount",
    "gpt4-prompts",
    { properties: { description: "Updated container for GPT-4 prompt caching", timeToLive: 14 } },
  );
  console.log(result);
}

async function main() {
  await updateAContextCacheContainer();
}

main().catch(console.error);
