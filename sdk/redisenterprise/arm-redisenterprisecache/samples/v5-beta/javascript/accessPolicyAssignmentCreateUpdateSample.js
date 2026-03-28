// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedisEnterpriseManagementClient } = require("@azure/arm-redisenterprisecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates/Updates a particular access policy assignment for a database
 *
 * @summary creates/Updates a particular access policy assignment for a database
 * x-ms-original-file: 2025-08-01-preview/RedisEnterpriseAccessPolicyAssignmentCreateUpdate.json
 */
async function redisEnterpriseAccessPolicyAssignmentCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const client = new RedisEnterpriseManagementClient(credential, subscriptionId);
  const result = await client.accessPolicyAssignment.createUpdate(
    "rg1",
    "cache1",
    "default",
    "defaultTestEntraApp1",
    { accessPolicyName: "default", user: { objectId: "6497c918-11ad-41e7-1b0f-7c518a87d0b0" } },
  );
  console.log(result);
}

async function main() {
  await redisEnterpriseAccessPolicyAssignmentCreateUpdate();
}

main().catch(console.error);
