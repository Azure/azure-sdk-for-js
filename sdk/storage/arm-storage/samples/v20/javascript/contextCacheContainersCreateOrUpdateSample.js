// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a container in a Context Cache.
 *
 * @summary create or update a container in a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheContainerCRUD/ContextCacheContainers_CreateOrUpdate.json
 */
async function createAContextCacheContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.contextCacheContainers.createOrUpdate(
    "testrg",
    "testaccount",
    "gpt4-prompts",
    {
      properties: {
        description: "Container for GPT-4 prompt caching",
        modelName: "gpt-4",
        provider: "OpenAI",
        timeToLive: 7,
      },
    },
  );
  console.log(result);
}

async function main() {
  await createAContextCacheContainer();
}

main().catch(console.error);
