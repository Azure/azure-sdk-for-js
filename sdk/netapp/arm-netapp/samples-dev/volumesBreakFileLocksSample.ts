// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Break all the file locks on a volume
 *
 * @summary Break all the file locks on a volume
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/Volumes_BreakFileLocks.json
 */

import {
  BreakFileLocksRequest,
  VolumesBreakFileLocksOptionalParams,
  NetAppManagementClient,
} from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumesBreakFileLocks(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const poolName = "pool1";
  const volumeName = "volume1";
  const body: BreakFileLocksRequest = {
    clientIp: "101.102.103.104",
    confirmRunningDisruptiveOperation: true,
  };
  const options: VolumesBreakFileLocksOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.beginBreakFileLocksAndWait(
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesBreakFileLocks();
}

main().catch(console.error);
