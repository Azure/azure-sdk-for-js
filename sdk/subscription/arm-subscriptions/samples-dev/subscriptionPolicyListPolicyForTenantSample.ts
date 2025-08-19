// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the subscription tenant policy for the user's tenant.
 *
 * @summary Get the subscription tenant policy for the user's tenant.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getTenantPolicyList.json
 */

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function getTenantPolicyList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptionPolicy.listPolicyForTenant()) {
    resArray.push(item);
  }
  console.log(resArray);
}

getTenantPolicyList().catch(console.error);
