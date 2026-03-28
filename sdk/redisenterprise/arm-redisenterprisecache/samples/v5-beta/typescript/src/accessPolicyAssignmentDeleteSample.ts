// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a single access policy assignment.
 *
 * @summary deletes a single access policy assignment.
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseAccessPolicyAssignmentDelete.json
 */
async function redisEnterpriseAccessPolicyAssignmentDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  await client.accessPolicyAssignment.delete("rg1", "cache1", "default", "defaultTestEntraApp1");
}

async function main(): Promise<void> {
  await redisEnterpriseAccessPolicyAssignmentDelete();
}

main().catch(console.error);
