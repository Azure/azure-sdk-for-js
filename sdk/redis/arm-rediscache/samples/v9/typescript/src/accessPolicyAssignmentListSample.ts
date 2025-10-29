// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of access policy assignments associated with this redis cache
 *
 * @summary gets the list of access policy assignments associated with this redis cache
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentList.json
 */
async function redisCacheAccessPolicyAssignmentList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessPolicyAssignment.list("rg1", "cache1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await redisCacheAccessPolicyAssignmentList();
}

main().catch(console.error);
