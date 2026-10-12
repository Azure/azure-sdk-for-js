// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a migration in a Redis Enterprise cluster.
 *
 * @summary gets information about a migration in a Redis Enterprise cluster.
 * x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationGet.json
 */
async function redisEnterpriseMigrationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.migrations.get("rg1", "cache1");
  console.log(result);
}

async function main() {
  await redisEnterpriseMigrationGet();
}

main().catch(console.error);
