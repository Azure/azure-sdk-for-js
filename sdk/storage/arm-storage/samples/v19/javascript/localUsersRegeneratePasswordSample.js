// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Regenerate the local user SSH password.
 *
 * @summary Regenerate the local user SSH password.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/LocalUserRegeneratePassword.json
 */
async function regenerateLocalUserPassword() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const username = "user1";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.localUsersOperations.regeneratePassword(
    resourceGroupName,
    accountName,
    username,
  );
  console.log(result);
}

async function main() {
  await regenerateLocalUserPassword();
}

main().catch(console.error);
