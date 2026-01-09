// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list and describe all NetApp accounts in the subscription.
 *
 * @summary list and describe all NetApp accounts in the subscription.
 * x-ms-original-file: 2025-09-01-preview/Accounts_ListBySubscription.json
 */
async function accountsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
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
