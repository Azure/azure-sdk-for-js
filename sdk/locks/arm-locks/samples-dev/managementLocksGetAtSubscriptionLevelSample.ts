// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a management lock at the subscription level.
 *
 * @summary Gets a management lock at the subscription level.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_GetAtSubscriptionLevel.json
 */

import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

async function getManagementLockAtSubscriptionLevel(): Promise<void> {
  const subscriptionId = "subscriptionId";
  const lockName = "testlock";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.getAtSubscriptionLevel(lockName);
  console.log(result);
}

getManagementLockAtSubscriptionLevel().catch(console.error);
