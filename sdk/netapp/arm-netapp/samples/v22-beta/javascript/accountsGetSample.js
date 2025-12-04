// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the NetApp account
 *
 * @summary get the NetApp account
 * x-ms-original-file: 2025-09-01-preview/Accounts_Get.json
 */
async function accountsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.accounts.get("myRG", "account1");
  console.log(result);
}

async function main() {
  await accountsGet();
}

main().catch(console.error);
