// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete Alias.
 *
 * @summary Delete Alias.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/deleteAlias.json
 */

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteAlias(): Promise<void> {
  const aliasName = "aliasForNewSub";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.alias.delete(aliasName);
  console.log(result);
}

deleteAlias().catch(console.error);
