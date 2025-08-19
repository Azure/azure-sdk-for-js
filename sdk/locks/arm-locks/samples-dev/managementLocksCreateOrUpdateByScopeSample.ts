// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a management lock by scope.
 *
 * @summary Create or update a management lock by scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_CreateOrUpdateAtScope.json
 */

import type { ManagementLockObject } from "@azure/arm-locks";
import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

async function createManagementLockAtScope(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/subscriptionId";
  const lockName = "testlock";
  const parameters: ManagementLockObject = { level: "ReadOnly" };
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.createOrUpdateByScope(scope, lockName, parameters);
  console.log(result);
}

createManagementLockAtScope().catch(console.error);
