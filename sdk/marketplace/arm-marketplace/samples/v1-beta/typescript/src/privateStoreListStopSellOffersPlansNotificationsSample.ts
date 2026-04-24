// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list stop sell notifications for both stop sell offers and stop sell plans
 *
 * @summary list stop sell notifications for both stop sell offers and stop sell plans
 * x-ms-original-file: 2025-01-01/ListStopSellOffersPlansNotifications.json
 */
async function listStopSellOffersPlansNotifications(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.listStopSellOffersPlansNotifications(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listStopSellOffersPlansNotifications();
}

main().catch(console.error);
