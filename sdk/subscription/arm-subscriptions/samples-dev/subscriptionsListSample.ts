// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all subscriptions for a tenant.
 *
 * @summary Gets all subscriptions for a tenant.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2016-06-01/examples/listSubscriptions.json
 */

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function listSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptions.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listSubscriptions().catch(console.error);
