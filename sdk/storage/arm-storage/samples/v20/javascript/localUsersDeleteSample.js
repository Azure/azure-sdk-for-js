// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the local user associated with the specified storage account.
 *
 * @summary deletes the local user associated with the specified storage account.
 * x-ms-original-file: 2025-08-01/LocalUserDelete.json
 */
async function deleteLocalUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.localUsers.delete("res6977", "sto2527", "user1");
}

async function main() {
  await deleteLocalUser();
}

main().catch(console.error);
