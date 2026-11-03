// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to set rule for specific private store and collection
 *
 * @summary set rule for specific private store and collection
 * x-ms-original-file: 2025-01-01/SetCollectionRules.json
 */
async function setCollectionRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  await client.setCollectionRules(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "56a1a02d-8cf8-45df-bf37-d5f7120fcb3d",
    { payload: { value: [{ type: "PrivateProducts" }] } },
  );
}

async function main(): Promise<void> {
  await setCollectionRules();
}

main().catch(console.error);
