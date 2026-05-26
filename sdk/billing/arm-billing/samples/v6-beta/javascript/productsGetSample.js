// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a product by ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary gets a product by ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/productsGet.json
 */
async function productsGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.products.get(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
  );
  console.log(result);
}

async function main() {
  await productsGet();
}

main().catch(console.error);
