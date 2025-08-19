// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to cancel an Azure Site Recovery job.
 *
 * @summary The operation to cancel an Azure Site Recovery job.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationJobs_Cancel.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cancelsTheSpecifiedJob(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const jobName = "2653c648-fc72-4316-86f3-fdf8eaa0066b";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.beginCancelAndWait(
    resourceGroupName,
    resourceName,
    jobName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cancelsTheSpecifiedJob();
}

main().catch(console.error);
