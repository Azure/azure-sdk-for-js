// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the authorization keys associated with this account.
 *
 * @summary list the authorization keys associated with this account.
 * x-ms-original-file: 2024-04-01-preview/Accounts_ListKeys.json
 */
async function accountsListKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.accounts.listKeys("SampleResourceGroup", "account1");
  console.log(result);
}

async function main() {
  await accountsListKeys();
}

main().catch(console.error);
