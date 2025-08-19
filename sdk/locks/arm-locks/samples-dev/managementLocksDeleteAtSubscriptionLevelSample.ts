// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to To delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 *
 * @summary To delete management locks, you must have access to Microsoft.Authorization/* or Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access Administrator are granted those actions.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_DeleteAtSubscriptionLevel.json
 */

import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteManagementLockAtSubscriptionLevel(): Promise<void> {
  const subscriptionId = "subscriptionId";
  const lockName = "testlock";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.deleteAtSubscriptionLevel(lockName);
  console.log(result);
}

deleteManagementLockAtSubscriptionLevel().catch(console.error);
