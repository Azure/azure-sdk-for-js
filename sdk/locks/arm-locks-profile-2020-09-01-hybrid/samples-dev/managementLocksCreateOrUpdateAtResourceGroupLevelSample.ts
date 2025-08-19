// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementLockObject } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { ManagementLockClient } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @summary When you apply a lock at a parent scope, all child resources inherit the same lock. To create management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2016-09-01/examples/ManagementLocks_CreateOrUpdateAtResourceGroupLevel.json
 */
async function createManagementLockAtResourceGroupLevel(): Promise<void> {
  const subscriptionId = process.env["LOCKS_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["LOCKS_RESOURCE_GROUP"] || "resourcegroupname";
  const lockName = "testlock";
  const parameters: ManagementLockObject = { level: "ReadOnly" };
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.createOrUpdateAtResourceGroupLevel(
    resourceGroupName,
    lockName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createManagementLockAtResourceGroupLevel();
}

main().catch(console.error);
