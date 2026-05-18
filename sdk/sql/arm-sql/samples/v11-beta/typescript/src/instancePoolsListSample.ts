// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all instance pools in the subscription.
 *
 * @summary gets a list of all instance pools in the subscription.
 * x-ms-original-file: 2025-02-01-preview/ListInstancePoolsBySubscriptionId.json
 */
async function listInstancePoolsInTheSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instancePools.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listInstancePoolsInTheSubscription();
}

main().catch(console.error);
