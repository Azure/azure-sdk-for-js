// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisManagementClient } = require("@azure/arm-rediscache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the access policy assignment from a redis cache
 *
 * @summary deletes the access policy assignment from a redis cache
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentDelete.json
 */
async function redisCacheAccessPolicyAssignmentDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  await client.accessPolicyAssignment.delete("rg1", "cache1", "accessPolicyAssignmentName1");
}

async function main() {
  await redisCacheAccessPolicyAssignmentDelete();
}

main().catch(console.error);
