// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PurviewManagementClient } = require("@azure/arm-purview");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list accounts in Subscription
 *
 * @summary list accounts in Subscription
 * x-ms-original-file: 2024-04-01-preview/Accounts_ListBySubscription.json
 */
async function accountsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await accountsListBySubscription();
}

main().catch(console.error);
