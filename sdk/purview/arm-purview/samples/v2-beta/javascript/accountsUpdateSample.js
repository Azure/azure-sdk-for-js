// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an account
 *
 * @summary updates an account
 * x-ms-original-file: 2024-04-01-preview/Accounts_Update.json
 */
async function accountsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const result = await client.accounts.update("SampleResourceGroup", "account1", {
    cloudConnectors: {},
    ingestionStorage: { publicNetworkAccess: "Disabled" },
    managedResourcesPublicNetworkAccess: "Disabled",
    publicNetworkAccess: "Disabled",
    tags: { newTag: "New tag value." },
  });
  console.log(result);
}

async function main() {
  await accountsUpdate();
}

main().catch(console.error);
