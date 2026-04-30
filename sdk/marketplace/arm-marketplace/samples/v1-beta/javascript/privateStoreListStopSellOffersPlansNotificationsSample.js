// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list stop sell notifications for both stop sell offers and stop sell plans
 *
 * @summary list stop sell notifications for both stop sell offers and stop sell plans
 * x-ms-original-file: 2025-01-01/ListStopSellOffersPlansNotifications.json
 */
async function listStopSellOffersPlansNotifications() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.listStopSellOffersPlansNotifications(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main() {
  await listStopSellOffersPlansNotifications();
}

main().catch(console.error);
