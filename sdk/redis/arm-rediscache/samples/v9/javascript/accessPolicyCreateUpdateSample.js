// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds an access policy to the redis cache
 *
 * @summary adds an access policy to the redis cache
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyCreateUpdate.json
 */
async function redisCacheAccessPolicyCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.accessPolicy.createUpdate("rg1", "cache1", "accessPolicy1", {
    properties: { permissions: "+get +hget" },
  });
  console.log(result);
}

async function main() {
  await redisCacheAccessPolicyCreateUpdate();
}

main().catch(console.error);
