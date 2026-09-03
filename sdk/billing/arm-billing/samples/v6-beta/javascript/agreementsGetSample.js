// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an agreement by ID.
 *
 * @summary gets an agreement by ID.
 * x-ms-original-file: 2024-04-01/agreementByName.json
 */
async function agreementByName() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.agreements.get(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "ABC123",
  );
  console.log(result);
}

async function main() {
  await agreementByName();
}

main().catch(console.error);
