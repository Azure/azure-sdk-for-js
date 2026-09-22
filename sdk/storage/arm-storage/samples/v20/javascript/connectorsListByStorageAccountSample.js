// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Storage Connectors in a Storage Account.
 *
 * @summary list all Storage Connectors in a Storage Account.
 * x-ms-original-file: 2026-04-01/StorageConnectorCRUD/StorageConnectors_ListByStorageAccount.json
 */
async function listConnectorsByStorageAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectors.listByStorageAccount("testrg", "teststorageaccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listConnectorsByStorageAccount();
}

main().catch(console.error);
