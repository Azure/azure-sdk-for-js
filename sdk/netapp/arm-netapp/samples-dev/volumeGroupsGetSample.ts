// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get details of the specified volume group
 *
 * @summary get details of the specified volume group
 * x-ms-original-file: 2025-09-01-preview/VolumeGroups_Get_Oracle.json
 */
async function volumeGroupsGetOracle(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumeGroups.get("myRG", "account1", "group1");
  console.log(result);
}

/**
 * This sample demonstrates how to get details of the specified volume group
 *
 * @summary get details of the specified volume group
 * x-ms-original-file: 2025-09-01-preview/VolumeGroups_Get_SapHana.json
 */
async function volumeGroupsGetSapHana(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumeGroups.get("myRG", "account1", "group1");
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsGetOracle();
  await volumeGroupsGetSapHana();
}

main().catch(console.error);
