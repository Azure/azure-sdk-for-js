// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to restart an Azure Site Recovery job.
 *
 * @summary The operation to restart an Azure Site Recovery job.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationJobs_Restart.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function restartsTheSpecifiedJob(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const jobName = "0664564c-353e-401a-ab0c-722257c10e25";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.beginRestartAndWait(
    resourceGroupName,
    resourceName,
    jobName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restartsTheSpecifiedJob();
}

main().catch(console.error);
