// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list new plans notifications
 *
 * @summary list new plans notifications
 * x-ms-original-file: 2025-01-01/ListNewPlansNotifications.json
 */
async function listNewPlansNotifications() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.listNewPlansNotifications(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
  );
  console.log(result);
}

async function main() {
  await listNewPlansNotifications();
}

main().catch(console.error);
