// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of an ASR replication protected item.
 *
 * @summary gets the details of an ASR replication protected item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_Get.json
 */
async function getsTheDetailsOfAReplicationProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.get(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDetailsOfAReplicationProtectedItem();
}

main().catch(console.error);
