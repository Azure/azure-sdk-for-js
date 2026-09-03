// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified share under its account.
 *
 * @summary deletes specified share under its account.
 * x-ms-original-file: 2026-04-01/FileSharesDelete.json
 */
async function deleteShares() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.fileShares.delete("res4079", "sto4506", "share9689");
}

async function main() {
  await deleteShares();
}

main().catch(console.error);
