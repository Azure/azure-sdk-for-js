// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list and describe all NetApp accounts in the resource group.
 *
 * @summary list and describe all NetApp accounts in the resource group.
 * x-ms-original-file: 2025-09-01-preview/Accounts_List.json
 */
async function accountsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.list("myRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await accountsList();
}

main().catch(console.error);
