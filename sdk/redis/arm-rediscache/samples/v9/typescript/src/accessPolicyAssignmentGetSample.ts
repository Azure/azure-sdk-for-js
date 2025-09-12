// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of assignments for an access policy of a redis cache
 *
 * @summary gets the list of assignments for an access policy of a redis cache
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentGet.json
 */
async function redisCacheAccessPolicyAssignmentGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.accessPolicyAssignment.get(
    "rg1",
    "cache1",
    "accessPolicyAssignmentName1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheAccessPolicyAssignmentGet();
}

main().catch(console.error);
