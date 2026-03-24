// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about access policy assignment for database.
 *
 * @summary gets information about access policy assignment for database.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseAccessPolicyAssignmentGet.json
 */
async function redisEnterpriseAccessPolicyAssignmentGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.accessPolicyAssignment.get(
    "rg1",
    "cache1",
    "default",
    "accessPolicyAssignmentName1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisEnterpriseAccessPolicyAssignmentGet();
}

main().catch(console.error);
