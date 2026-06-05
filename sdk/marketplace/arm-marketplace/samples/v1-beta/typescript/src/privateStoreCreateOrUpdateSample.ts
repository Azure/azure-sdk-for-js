// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to changes private store properties
 *
 * @summary changes private store properties
 * x-ms-original-file: 2025-01-01/PrivateStores_update.json
 */
async function privateStoresUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.privateStore.createOrUpdate("a0e28e55-90c4-41d8-8e34-bb7ef7775406", {
    payload: { availability: "disabled", eTag: '"9301f4fd-0000-0100-0000-5e248b350345"' },
  });
}

async function main(): Promise<void> {
  await privateStoresUpdate();
}

main().catch(console.error);
