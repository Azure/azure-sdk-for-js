// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetch all subscriptions in tenant, only for marketplace admin
 *
 * @summary fetch all subscriptions in tenant, only for marketplace admin
 * x-ms-original-file: 2025-01-01/FetchAllSubscriptionsInTenant.json
 */
async function fetchAllSubscriptionsInTenant() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.fetchAllSubscriptionsInTenant(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main() {
  await fetchAllSubscriptionsInTenant();
}

main().catch(console.error);
