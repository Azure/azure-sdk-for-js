// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-resources-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to compares a subscriptions logical zone mapping
 *
 * @summary compares a subscriptions logical zone mapping
 * x-ms-original-file: 2022-12-01/PostCheckZonePeers.json
 */
async function getLogicalZoneMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptions.checkZonePeers("8d65815f-a5b6-402f-9298-045155da7d74", {
    location: "eastus",
    subscriptionIds: ["subscriptions/11111111-1111-1111-1111-111111111111"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getLogicalZoneMapping();
}

main().catch(console.error);
