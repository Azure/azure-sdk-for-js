// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Alias Subscription.
 *
 * @summary get Alias Subscription.
 * x-ms-original-file: 2025-11-01-preview/getAlias.json
 */
async function getAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.alias.get("dummyalias");
  console.log(result);
}

async function main(): Promise<void> {
  await getAlias();
}

main().catch(console.error);
