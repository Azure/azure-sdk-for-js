// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to purge(force delete) an Azure Site Recovery fabric.
 *
 * @summary the operation to purge(force delete) an Azure Site Recovery fabric.
 * x-ms-original-file: 2025-08-01/ReplicationFabrics_Purge.json
 */
async function purgesTheSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationFabrics.purge("resourceGroupPS1", "vault1", "cloud1");
}

async function main(): Promise<void> {
  await purgesTheSite();
}

main().catch(console.error);
