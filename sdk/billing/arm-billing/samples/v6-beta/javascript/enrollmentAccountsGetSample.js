// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an enrollment account by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets an enrollment account by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/enrollmentAccountGet.json
 */
async function enrollmentAccountGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.enrollmentAccounts.get("6564892", "257698");
  console.log(result);
}

async function main() {
  await enrollmentAccountGet();
}

main().catch(console.error);
