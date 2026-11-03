// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to resume an Azure Site Recovery job.
 *
 * @summary the operation to resume an Azure Site Recovery job.
 * x-ms-original-file: 2025-08-01/ReplicationJobs_Resume.json
 */
async function resumesTheSpecifiedJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.resume(
    "resourceGroupPS1",
    "vault1",
    "58776d0b-3141-48b2-a377-9ad863eb160d",
    { properties: { comments: " " } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resumesTheSpecifiedJob();
}

main().catch(console.error);
