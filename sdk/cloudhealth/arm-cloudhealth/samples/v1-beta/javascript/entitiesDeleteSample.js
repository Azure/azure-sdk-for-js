// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Entity
 *
 * @summary delete a Entity
 * x-ms-original-file: 2026-05-01-preview/Entities_Delete.json
 */
async function entitiesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.entities.delete("online-store-rg", "online-store", "catalog-storage");
}

async function main() {
  await entitiesDelete();
}

main().catch(console.error);
