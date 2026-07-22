// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an account.
 *
 * @summary delete an account.
 * x-ms-original-file: 2020-10-30-preview/deleteAccount.json
 */
async function deleteAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  await client.accounts.delete("account", "resourceGroup");
}

async function main() {
  await deleteAccount();
}

main().catch(console.error);
