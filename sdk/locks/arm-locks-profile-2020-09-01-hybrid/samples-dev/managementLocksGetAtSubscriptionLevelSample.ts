// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementLockClient } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a management lock at the subscription level.
 *
 * @summary Gets a management lock at the subscription level.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2016-09-01/examples/ManagementLocks_GetAtSubscriptionLevel.json
 */
async function getManagementLockAtSubscriptionLevel(): Promise<void> {
  const subscriptionId = process.env["LOCKS_SUBSCRIPTION_ID"] || "subscriptionId";
  const lockName = "testlock";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const result = await client.managementLocks.getAtSubscriptionLevel(lockName);
  console.log(result);
}

async function main(): Promise<void> {
  await getManagementLockAtSubscriptionLevel();
}

main().catch(console.error);
