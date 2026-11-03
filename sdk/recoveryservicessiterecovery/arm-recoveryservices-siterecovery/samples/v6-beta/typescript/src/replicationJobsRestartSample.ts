// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to restart an Azure Site Recovery job.
 *
 * @summary the operation to restart an Azure Site Recovery job.
 * x-ms-original-file: 2025-08-01/ReplicationJobs_Restart.json
 */
async function restartsTheSpecifiedJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.restart(
    "resourceGroupPS1",
    "vault1",
    "0664564c-353e-401a-ab0c-722257c10e25",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restartsTheSpecifiedJob();
}

main().catch(console.error);
