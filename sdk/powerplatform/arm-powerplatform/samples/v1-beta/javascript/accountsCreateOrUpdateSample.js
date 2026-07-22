// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an account.
 *
 * @summary creates an account.
 * x-ms-original-file: 2020-10-30-preview/createOrUpdateAccount.json
 */
async function createOrUpdateAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const result = await client.accounts.createOrUpdate("account", "resourceGroup", {
    location: "East US",
    description: "Description of the account.",
    tags: { Organization: "Administration" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAccount();
}

main().catch(console.error);
