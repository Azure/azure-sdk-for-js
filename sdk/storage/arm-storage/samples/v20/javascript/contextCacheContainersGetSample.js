// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a container in a Context Cache.
 *
 * @summary get a container in a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheContainerCRUD/ContextCacheContainers_Get.json
 */
async function getAContextCacheContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCacheContainers.get("testrg", "testaccount", "gpt4-prompts");
  console.log(result);
}

async function main() {
  await getAContextCacheContainer();
}

main().catch(console.error);
