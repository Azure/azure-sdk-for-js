// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a management lock by scope.
 *
 * @summary Delete a management lock by scope.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtScope.json
 */

import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteManagementLockAtScope(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const scope = "subscriptions/subscriptionId";
  const lockName = "testlock";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.deleteByScope(scope, lockName);
  console.log(result);
}

deleteManagementLockAtScope().catch(console.error);
