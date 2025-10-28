// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisManagementClient } from "@azure/arm-rediscache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds the access policy assignment to the specified users
 *
 * @summary adds the access policy assignment to the specified users
 * x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentCreateUpdate.json
 */
async function redisCacheAccessPolicyAssignmentCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RedisManagementClient(credential, subscriptionId);
  const result = await client.accessPolicyAssignment.createUpdate(
    "rg1",
    "cache1",
    "accessPolicyAssignmentName1",
    {
      properties: {
        accessPolicyName: "accessPolicy1",
        objectId: "6497c918-11ad-41e7-1b0f-7c518a87d0b0",
        objectIdAlias: "TestAADAppRedis",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await redisCacheAccessPolicyAssignmentCreateUpdate();
}

main().catch(console.error);
