// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerate the local user SSH password.
 *
 * @summary regenerate the local user SSH password.
 * x-ms-original-file: 2025-08-01/LocalUserRegeneratePassword.json
 */
async function regenerateLocalUserPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.localUsers.regeneratePassword("res6977", "sto2527", "user1");
  console.log(result);
}

async function main() {
  await regenerateLocalUserPassword();
}

main().catch(console.error);
