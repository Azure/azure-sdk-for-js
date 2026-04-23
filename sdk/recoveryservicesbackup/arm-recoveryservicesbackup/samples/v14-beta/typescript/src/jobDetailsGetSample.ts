// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets extended information associated with the job.
 *
 * @summary gets extended information associated with the job.
 * x-ms-original-file: 2026-01-01-preview/Common/GetJobDetails.json
 */
async function getJobDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.jobDetails.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getJobDetails();
}

main().catch(console.error);
