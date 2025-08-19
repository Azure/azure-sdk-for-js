// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the management locks for a subscription.
 *
 * @summary Gets all the management locks for a subscription.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2020-05-01/examples/ManagementLocks_ListAtSubscriptionLevel.json
 */

import { ManagementLockClient } from "@azure/arm-locks";
import { DefaultAzureCredential } from "@azure/identity";

async function listManagementLocksAtSubscriptionLevel(): Promise<void> {
  const subscriptionId = "subscriptionId";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managementLocks.listAtSubscriptionLevel()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listManagementLocksAtSubscriptionLevel().catch(console.error);
