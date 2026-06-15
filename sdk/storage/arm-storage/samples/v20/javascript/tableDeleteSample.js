// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the table with the specified table name, under the specified account if it exists.
 *
 * @summary deletes the table with the specified table name, under the specified account if it exists.
 * x-ms-original-file: 2026-04-01/TableOperationDelete.json
 */
async function tableOperationDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.table.delete("res3376", "sto328", "table6185");
}

async function main() {
  await tableOperationDelete();
}

main().catch(console.error);
