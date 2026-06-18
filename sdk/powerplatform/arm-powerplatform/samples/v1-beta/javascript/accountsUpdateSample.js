// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an account.
 *
 * @summary updates an account.
 * x-ms-original-file: 2020-10-30-preview/updateAccount.json
 */
async function updateAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.accounts.update("account", "resourceGroup", {
    location: "East US",
    description: "Description of account.",
    tags: { Organization: "Administration" },
  });
  console.log(result);
}

async function main() {
  await updateAccount();
}

main().catch(console.error);
