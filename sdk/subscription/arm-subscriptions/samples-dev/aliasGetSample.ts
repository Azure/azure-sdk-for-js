// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get Alias Subscription.
 *
 * @summary Get Alias Subscription.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getAlias.json
 */

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function getAlias(): Promise<void> {
  const aliasName = "aliasForNewSub";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.alias.get(aliasName);
  console.log(result);
}

getAlias().catch(console.error);
