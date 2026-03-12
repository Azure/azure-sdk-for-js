// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the details of a protectable item.
 *
 * @summary the operation to get the details of a protectable item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectableItems_Get.json
 */
async function getsTheDetailsOfAProtectableItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectableItems.get(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "c0c14913-3d7a-48ea-9531-cc99e0e686e6",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDetailsOfAProtectableItem();
}

main().catch(console.error);
