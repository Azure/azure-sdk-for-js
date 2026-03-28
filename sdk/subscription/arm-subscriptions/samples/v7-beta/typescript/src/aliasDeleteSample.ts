// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Alias.
 *
 * @summary delete Alias.
 * x-ms-original-file: 2025-11-01-preview/deleteAlias.json
 */
async function deleteAlias(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  await client.alias.delete("dummyalias");
}

async function main(): Promise<void> {
  await deleteAlias();
}

main().catch(console.error);
