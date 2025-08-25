// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the specified volume group only if there are no volumes under volume group.
 *
 * @summary Delete the specified volume group only if there are no volumes under volume group.
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/VolumeGroups_Delete.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumeGroupsDelete(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const volumeGroupName = "group1";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumeGroups.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    volumeGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsDelete();
}

main().catch(console.error);
