// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates the Redis Enterprise database's access keys.
 *
 * @summary regenerates the Redis Enterprise database's access keys.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesRegenerateKey.json
 */
async function redisEnterpriseDatabasesRegenerateKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.databases.regenerateKey("rg1", "cache1", "default", {
    keyType: "Primary",
  });
  console.log(result);
}

async function main() {
  await redisEnterpriseDatabasesRegenerateKey();
}

main().catch(console.error);
