// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the tenants for your account.
 *
 * @summary Gets the tenants for your account.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2016-06-01/examples/listTenants.json
 */

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function listTenants(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.tenants.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

listTenants().catch(console.error);
