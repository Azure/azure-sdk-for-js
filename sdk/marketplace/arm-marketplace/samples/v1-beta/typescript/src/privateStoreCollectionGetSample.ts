// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets private store collection
 *
 * @summary gets private store collection
 * x-ms-original-file: 2025-01-01/GetPrivateStoreCollection.json
 */
async function getPrivateStoreCollection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollection.get(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateStoreCollection();
}

main().catch(console.error);
