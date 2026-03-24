// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Redis Enterprise cache cluster.
 *
 * @summary deletes a Redis Enterprise cache cluster.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDelete.json
 */
async function redisEnterpriseDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.redisEnterprise.delete("rg1", "cache1");
}

async function main() {
  await redisEnterpriseDelete();
}

main().catch(console.error);
