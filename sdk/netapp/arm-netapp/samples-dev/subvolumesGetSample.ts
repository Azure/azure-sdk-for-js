// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the path associated with the subvolumeName provided
 *
 * @summary Returns the path associated with the subvolumeName provided
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/Subvolumes_Get.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function subvolumesGet(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const poolName = "pool1";
  const volumeName = "volume1";
  const subvolumeName = "subvolume1";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.subvolumes.get(
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    subvolumeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await subvolumesGet();
}

main().catch(console.error);
