// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets private store collections list
 *
 * @summary gets private store collections list
 * x-ms-original-file: 2025-01-01/GetPrivateStoreCollectionsList.json
 */
async function getPrivateStoreCollectionsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStoreCollection.list("a0e28e55-90c4-41d8-8e34-bb7ef7775406");
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateStoreCollectionsList();
}

main().catch(console.error);
