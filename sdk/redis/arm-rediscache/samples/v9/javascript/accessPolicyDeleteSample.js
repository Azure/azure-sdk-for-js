// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the access policy from a redis cache
 *
 * @summary deletes the access policy from a redis cache
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyDelete.json
 */
async function redisCacheAccessPolicyDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.accessPolicy.delete("rg1", "cache1", "accessPolicy1");
}

async function main() {
  await redisCacheAccessPolicyDelete();
}

main().catch(console.error);
