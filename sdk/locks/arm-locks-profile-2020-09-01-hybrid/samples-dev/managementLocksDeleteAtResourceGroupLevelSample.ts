// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementLockClient } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to To delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @summary To delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2016-09-01/examples/ManagementLocks_DeleteAtResourceGroupLevel.json
 */
async function deleteManagementLockAtResourceGroupLevel(): Promise<void> {
  const subscriptionId = process.env["LOCKS_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName = process.env["LOCKS_RESOURCE_GROUP"] || "resourcegroupname";
  const lockName = "testlock";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.deleteAtResourceGroupLevel(
    resourceGroupName,
    lockName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteManagementLockAtResourceGroupLevel();
}

main().catch(console.error);
