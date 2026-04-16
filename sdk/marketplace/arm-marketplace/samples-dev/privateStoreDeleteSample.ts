// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the private store. All that is not saved will be lost.
 *
 * @summary deletes the private store. All that is not saved will be lost.
 * x-ms-original-file: 2025-01-01/DeletePrivateStore.json
 */
async function deletePrivateStores(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.privateStore.delete("a0e28e55-90c4-41d8-8e34-bb7ef7775406");
}

async function main(): Promise<void> {
  await deletePrivateStores();
}

main().catch(console.error);
