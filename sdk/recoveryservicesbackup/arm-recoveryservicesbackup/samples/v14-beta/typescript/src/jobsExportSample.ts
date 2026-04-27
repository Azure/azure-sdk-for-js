// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers export of jobs specified by filters and returns an OperationID to track.
 *
 * @summary triggers export of jobs specified by filters and returns an OperationID to track.
 * x-ms-original-file: 2026-01-01-preview/Common/TriggerExportJobs.json
 */
async function exportJobs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.jobs.export("NetSDKTestRsVault", "SwaggerTestRg");
}

async function main(): Promise<void> {
  await exportJobs();
}

main().catch(console.error);
