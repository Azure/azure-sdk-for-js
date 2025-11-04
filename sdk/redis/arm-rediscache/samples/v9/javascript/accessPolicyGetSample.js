// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the detailed information about an access policy of a redis cache
 *
 * @summary gets the detailed information about an access policy of a redis cache
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyGet.json
 */
async function redisCacheAccessPolicyGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.accessPolicy.get("rg1", "cache1", "accessPolicy1");
  console.log(result);
}

async function main() {
  await redisCacheAccessPolicyGet();
}

main().catch(console.error);
