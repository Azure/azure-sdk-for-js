// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the available recovery points for a replication protected item.
 *
 * @summary lists the available recovery points for a replication protected item.
 * x-ms-original-file: 2025-08-01/RecoveryPoints_ListByReplicationProtectedItems.json
 */
async function getsTheListOfRecoveryPointsForAReplicationProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoveryPoints.listByReplicationProtectedItems(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfRecoveryPointsForAReplicationProtectedItem();
}

main().catch(console.error);
