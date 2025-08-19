// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a management lock by scope.
 *
 * @summary Create or update a management lock by scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2016-09-01/examples/ManagementLocks_CreateOrUpdateAtScope.json
 */

import type { ManagementLockObject } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { ManagementLockClient } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createManagementLockAtScope(): Promise<void> {
  const subscriptionId =
    process.env["LOCKS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/subscriptionId";
  const lockName = "testlock";
  const parameters: ManagementLockObject = { level: "ReadOnly" };
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.createOrUpdateByScope(scope, lockName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await createManagementLockAtScope();
}

main().catch(console.error);
