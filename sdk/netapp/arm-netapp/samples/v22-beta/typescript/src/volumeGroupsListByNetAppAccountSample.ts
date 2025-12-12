// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all volume groups for given account
 *
 * @summary list all volume groups for given account
 * x-ms-original-file: 2025-09-01-preview/VolumeGroups_List_Oracle.json
 */
async function volumeGroupsListOracle(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByNetAppAccount("myRG", "account1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all volume groups for given account
 *
 * @summary list all volume groups for given account
 * x-ms-original-file: 2025-09-01-preview/VolumeGroups_List_SapHana.json
 */
async function volumeGroupsListSapHana(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeGroups.listByNetAppAccount("myRG", "account1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await volumeGroupsListOracle();
  await volumeGroupsListSapHana();
}

main().catch(console.error);
