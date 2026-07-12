// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the table with the specified table name, under the specified account if it exists.
 *
 * @summary gets the table with the specified table name, under the specified account if it exists.
 * x-ms-original-file: 2026-04-01/TableOperationGet.json
 */
async function tableOperationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.table.get("res3376", "sto328", "table6185");
  console.log(result);
}

async function main() {
  await tableOperationGet();
}

main().catch(console.error);
