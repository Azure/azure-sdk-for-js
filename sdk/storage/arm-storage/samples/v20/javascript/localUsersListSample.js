// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the local users associated with the storage account.
 *
 * @summary list the local users associated with the storage account.
 * x-ms-original-file: 2025-08-01/LocalUsersList.json
 */
async function listLocalUsers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localUsers.list("res6977", "sto2527")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list the local users associated with the storage account.
 *
 * @summary list the local users associated with the storage account.
 * x-ms-original-file: 2025-08-01/LocalUsersListNFSv3Enabled.json
 */
async function listNFSv3EnabledLocalUsers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.localUsers.list("res6977", "sto2527", { include: "nfsv3" })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listLocalUsers();
  await listNFSv3EnabledLocalUsers();
}

main().catch(console.error);
