// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 *
 * @summary gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement.
 * x-ms-original-file: 2024-04-01/departmentGet.json
 */
async function departmentGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.departments.get("456598", "164821");
  console.log(result);
}

async function main() {
  await departmentGet();
}

main().catch(console.error);
