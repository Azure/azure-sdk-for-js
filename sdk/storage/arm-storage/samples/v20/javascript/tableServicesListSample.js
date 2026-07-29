// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all table services for the storage account.
 *
 * @summary list all table services for the storage account.
 * x-ms-original-file: 2026-04-01/TableServicesList.json
 */
async function tableServicesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.tableServices.list("res9290", "sto1590");
  console.log(result);
}

async function main() {
  await tableServicesList();
}

main().catch(console.error);
