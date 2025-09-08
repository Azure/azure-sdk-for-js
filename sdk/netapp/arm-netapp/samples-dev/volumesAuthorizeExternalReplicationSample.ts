// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Starts SVM peering and returns a command to be run on the external ONTAP to accept it.  Once the SVM have been peered a SnapMirror will be created
 *
 * @summary Starts SVM peering and returns a command to be run on the external ONTAP to accept it.  Once the SVM have been peered a SnapMirror will be created
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/Volumes_AuthorizeExternalReplication.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function volumesAuthorizeExternalReplication(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const poolName = "pool1";
  const volumeName = "volume1";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.beginAuthorizeExternalReplicationAndWait(
    resourceGroupName,
    accountName,
    poolName,
    volumeName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesAuthorizeExternalReplication();
}

main().catch(console.error);
