// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of an Azure Site Recovery fabric.
 *
 * @summary gets the details of an Azure Site Recovery fabric.
 * x-ms-original-file: 2025-08-01/ReplicationFabrics_Get.json
 */
async function getsTheDetailsOfAnASRFabric(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationFabrics.get("resourceGroupPS1", "vault1", "cloud1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheDetailsOfAnASRFabric();
}

main().catch(console.error);
