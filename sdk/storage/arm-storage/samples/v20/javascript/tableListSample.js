// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all the tables under the specified storage account
 *
 * @summary gets a list of all the tables under the specified storage account
 * x-ms-original-file: 2025-08-01/TableOperationList.json
 */
async function tableOperationList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.table.list("res9290", "sto328")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await tableOperationList();
}

main().catch(console.error);
