// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Relationship
 *
 * @summary delete a Relationship
 * x-ms-original-file: 2026-05-01-preview/Relationships_Delete.json
 */
async function relationshipsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.relationships.delete(
    "online-store-rg",
    "online-store",
    "orders-api-to-catalog-storage",
  );
}

async function main() {
  await relationshipsDelete();
}

main().catch(console.error);
