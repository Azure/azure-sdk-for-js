// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SAS credentials of a storage account.
 *
 * @summary list SAS credentials of a storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountListAccountSAS.json
 */
async function storageAccountListAccountSAS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.listAccountSAS("res7985", "sto8588", {
    keyToSign: "key1",
    sharedAccessExpiryTime: new Date("2017-05-24T11:42:03.1567373Z"),
    permissions: "r",
    protocols: "https,http",
    resourceTypes: "s",
    services: "b",
    sharedAccessStartTime: new Date("2017-05-24T10:42:03.1567373Z"),
  });
  console.log(result);
}

async function main() {
  await storageAccountListAccountSAS();
}

main().catch(console.error);
