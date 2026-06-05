// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch all subscriptions in tenant, only for marketplace admin
 *
 * @summary fetch all subscriptions in tenant, only for marketplace admin
 * x-ms-original-file: 2025-01-01/FetchAllSubscriptionsInTenant.json
 */
async function fetchAllSubscriptionsInTenant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.fetchAllSubscriptionsInTenant(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await fetchAllSubscriptionsInTenant();
}

main().catch(console.error);
