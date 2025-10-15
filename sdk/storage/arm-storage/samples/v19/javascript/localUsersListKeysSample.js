// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List SSH authorized keys and shared key of the local user.
 *
 * @summary List SSH authorized keys and shared key of the local user.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/LocalUserListKeys.json
 */
async function listLocalUserKeys() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const username = "user1";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.localUsersOperations.listKeys(
    resourceGroupName,
    accountName,
    username,
  );
  console.log(result);
}

async function main() {
  await listLocalUserKeys();
}

main().catch(console.error);
