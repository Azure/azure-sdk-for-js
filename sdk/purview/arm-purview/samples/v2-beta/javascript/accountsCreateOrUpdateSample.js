// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an account
 *
 * @summary creates or updates an account
 * x-ms-original-file: 2024-04-01-preview/Accounts_CreateOrUpdate.json
 */
async function accountsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.accounts.createOrUpdate("SampleResourceGroup", "account1", {
    location: "West US 2",
  });
  console.log(result);
}

async function main() {
  await accountsCreateOrUpdate();
}

main().catch(console.error);
