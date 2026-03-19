// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to tenant billing accounts names
 *
 * @summary tenant billing accounts names
 * x-ms-original-file: 2025-01-01/BillingAccounts.json
 */
async function billingAccounts() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.billingAccounts("a0e28e55-90c4-41d8-8e34-bb7ef7775406");
  console.log(result);
}

async function main() {
  await billingAccounts();
}

main().catch(console.error);
