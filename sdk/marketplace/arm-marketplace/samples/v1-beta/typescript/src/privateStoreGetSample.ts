// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get information about the private store
 *
 * @summary get information about the private store
 * x-ms-original-file: 2025-01-01/GetPrivateStore.json
 */
async function getPrivateStore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.get("a0e28e55-90c4-41d8-8e34-bb7ef7775406");
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateStore();
}

main().catch(console.error);
