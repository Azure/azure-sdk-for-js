// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the local user of the storage account by username.
 *
 * @summary get the local user of the storage account by username.
 * x-ms-original-file: 2025-08-01/LocalUserGet.json
 */
async function getLocalUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.localUsers.get("res6977", "sto2527", "user1");
  console.log(result);
}

async function main() {
  await getLocalUser();
}

main().catch(console.error);
