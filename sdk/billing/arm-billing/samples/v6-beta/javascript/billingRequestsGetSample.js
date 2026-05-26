// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a billing request by its ID.
 *
 * @summary gets a billing request by its ID.
 * x-ms-original-file: 2024-04-01/billingRequestsGet.json
 */
async function billingRequestsGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingRequests.get("00000000-0000-0000-0000-000000000000");
  console.log(result);
}

async function main() {
  await billingRequestsGet();
}

main().catch(console.error);
