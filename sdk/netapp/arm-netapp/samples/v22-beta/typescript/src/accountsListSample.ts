// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list and describe all NetApp accounts in the resource group.
 *
 * @summary list and describe all NetApp accounts in the resource group.
 * x-ms-original-file: 2025-07-01-preview/Accounts_List.json
 */
async function accountsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.list("myRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await accountsList();
}

main().catch(console.error);
