// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to resume an Azure Site Recovery job.
 *
 * @summary The operation to resume an Azure Site Recovery job.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationJobs_Resume.json
 */

import {
  ResumeJobParams,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resumesTheSpecifiedJob(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const jobName = "58776d0b-3141-48b2-a377-9ad863eb160d";
  const resumeJobParams: ResumeJobParams = { properties: { comments: " " } };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationJobs.beginResumeAndWait(
    resourceGroupName,
    resourceName,
    jobName,
    resumeJobParams,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resumesTheSpecifiedJob();
}

main().catch(console.error);
