// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about an account.
 *
 * @summary get information about an account.
 * x-ms-original-file: 2020-10-30-preview/getAccount.json
 */
async function getAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.accounts.get("account", "rg");
  console.log(result);
}

async function main() {
  await getAccount();
}

main().catch(console.error);
