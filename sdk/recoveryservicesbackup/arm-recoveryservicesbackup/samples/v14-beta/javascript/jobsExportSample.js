// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers export of jobs specified by filters and returns an OperationID to track.
 *
 * @summary triggers export of jobs specified by filters and returns an OperationID to track.
 * x-ms-original-file: 2026-01-01-preview/Common/TriggerExportJobs.json
 */
async function exportJobs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.jobs.export("NetSDKTestRsVault", "SwaggerTestRg");
}

async function main() {
  await exportJobs();
}

main().catch(console.error);
