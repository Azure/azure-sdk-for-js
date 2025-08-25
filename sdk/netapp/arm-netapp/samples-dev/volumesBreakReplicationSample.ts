// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Break the replication connection on the destination volume
 *
 * @summary Break the replication connection on the destination volume
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/Volumes_BreakReplication.json
 */

import {
  BreakReplicationRequest,
  VolumesBreakReplicationOptionalParams,
  NetAppManagementClient,
} from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumesBreakReplication(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const poolName = "pool1";
  const volumeName = "volume1";
  const body: BreakReplicationRequest = { forceBreakReplication: false };
  const options: VolumesBreakReplicationOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.beginBreakReplicationAndWait(
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesBreakReplication();
}

main().catch(console.error);
