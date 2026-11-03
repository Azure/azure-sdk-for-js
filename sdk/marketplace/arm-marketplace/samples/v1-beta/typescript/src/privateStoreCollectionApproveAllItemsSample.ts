// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete all existing offers from the collection and enable approve all items.
 *
 * @summary delete all existing offers from the collection and enable approve all items.
 * x-ms-original-file: 2025-01-01/ApproveAllItems.json
 */
async function approveAllItems(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollection.approveAllItems(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveAllItems();
}

main().catch(console.error);
