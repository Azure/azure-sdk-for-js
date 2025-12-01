// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch the specified NetApp account
 *
 * @summary patch the specified NetApp account
 * x-ms-original-file: 2025-09-01-preview/Accounts_Update.json
 */
async function accountsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("myRG", "account1", {
    tags: { Tag1: "Value1" },
  });
  console.log(result);
}

async function main() {
  await accountsUpdate();
}

main().catch(console.error);
